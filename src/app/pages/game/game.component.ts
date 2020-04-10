import {Component, OnInit} from '@angular/core';
import {UtilityService} from '../../services/utility.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../services/http.service';
import {BrowseService} from '../../services/browse.service';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  authFormType: number;
  isAuthFormVisible: boolean;
  liveChannels: any;
  playBacksVideos: any;
  liveChannelstatus = false;
  videoStatus = false;
  game: any;
  channelStyle: any;
  videoStyle: any;
  followStatus = true;
  baseUrl = environment.baseUrl;
  prevliveChannels=[];
  afterliveChannels=[];
  showRest=false;
  showRestVideos=false;
  prevPlayBacksVideos=[];
  afterPlayBacksVideos=[];
  playBackStatus = true;
  channelstatus = true;
  constructor(
    private utilityService: UtilityService,
    private browseService: BrowseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    
  }

  async ngOnInit() {


   // console.log("tag filter",this.router.getCurrentNavigation().extras.state);
    this.getGame();
  }

  async getLiveChannelList() {


    this.videoStatus = false;
    this.liveChannelstatus = true;

    const response: any = await this.browseService.getLiveChannelList();
    let data = response.data;

    // this.liveChannels.forEach( async ch => {
    //   if (ch.playbackUrl !== null && ch.playbackUrl !== undefined) {
    //
    //     const plays = await ch.playbackUrl.split('/');
    //     const url = await plays[plays.length - 1].split('.');
    //     console.log('video user', url[0]);
    //     ch.playbackUrl = url[0];
    //   }
    // });
    const filterData = [];
    data.forEach(v => {
      if (v.gameTitle === this.game.title) {
        filterData.push(v);
      }
    });
    this.liveChannels=filterData;
    console.log('live channels', this.liveChannels);
    this.prevliveChannels=this.liveChannels.slice(0,4);
    this.afterliveChannels=this.liveChannels.slice(4,8);
    this.channelStyle = {color: 'red'};
    this.videoStyle = {color: 'black'};
  }
  getRoute() {
    if (!this.showRest) {
      // return '/' + this.route.params['value'].userName + '/channel'
    } else {
      return '/browse/channels';
    }
  }
  toggleRest(event) {
    $(event.target).prev().slideToggle();
    this.showRest = !this.showRest;
  }
  getAllLive() {
    if (this.liveChannels.length > 8) {
      return 'See all';
    } else {
      this.channelstatus = false;
      return '';
    }
  }
  async getRecentPlayBack() {
    this.videoStatus = true;
    this.liveChannelstatus = false;
    const response: any = await this.browseService.getRecentPlayBacks();
    const data = response.data;

    // data.forEach(async ch => {
    //   if (ch.playbackUrl !== null && ch.playbackUrl !== undefined) {
    //     const plays = await ch.playbackUrl.split('/');
    //     const url = await plays[plays.length - 1].split('.');
    //     // console.log('video user', url[0]);
    //     ch.playbackUrl = url[0];
    //   }
    // });
     const filterData = [];
    data.forEach(v => {
      if (v.gameTitle === this.game.title) {
        filterData.push(v);
      }
    });

    this.playBacksVideos = filterData;
    console.log("this.playBacksVideos",this.playBacksVideos);
    this.prevPlayBacksVideos=this.playBacksVideos.slice(0,4);
    this.afterPlayBacksVideos=this.playBacksVideos.slice(4,8);
    this.channelStyle = {color: 'black'};
    this.videoStyle = {color: 'red'};
    // console.log('live channels', this.liveChannels);
    //
    // this.liveChannels.map(ch => {
    //   if (ch.gameTitle.includes('after') || ch.streamDescription.includes('after')) {
    //     filterData.push(ch);
    //   } else {
    //     ch.streamTags.forEach(t => {
    //       if (t.includes('after')) {
    //         filterData.push(ch);
    //       }
    //     });
    //   }
    // });
    //
    // console.log('filterData', filterData);
  }
  getAllPlayBacks() {
    if (this.playBacksVideos.length > 8) {
      return 'See all';
    } else {
      this.playBackStatus = false;
      return '';
    }
  }
  getRouteVideos() {
    if (!this.showRestVideos) {
      // return '/' + this.route.params['value'].userName + '/channel'
    } else {
      return '/browse/recentVideos';

    }
  }
  toggleRestVideos(event) {
    $(event.target).prev().slideToggle();
    this.showRestVideos = !this.showRestVideos;
  }
  async getGame() {
    // @ts-ignore
    let gameTitle = await this.route.params.value.gameTitle;

    if(gameTitle.includes("-")){
        let arr= gameTitle.split("-");
        let first=arr[0];
        for(let i=1;i<arr.length;i++){
          first=first+" "+arr[i];
        }
        gameTitle=first;
    }

    const response: any = await this.browseService.getGameData(gameTitle);
    this.game = response.data;
    // console.log('game::::::::', this.game);

    this.getFollowStatus();
    this.getRecentPlayBack();
  }

  getImageUrl(url) {
    if (url === '') {
      return url;
    } else if (url !== '' && url.includes('data:image/')) {
      return url;
    } else {
      return this.utilityService.getImageUrl(url);
    }
  }

  async followChannel(game: any) {
    const user = localStorage.getItem('user_data');
    if (user) {
      this.isAuthFormVisible = false;
      this.browseService.followUpChannel(game).then( result => {
        this.ngOnInit();
       }).catch( err => {
        this.followStatus = false;
      });

    } else {
      this.utilityService.toastr.error('Only logged user can follow', '', {positionClass: 'toast-top-center'});

      return this.showAuthForm(0);
    }
  }

  countViewers() {
    this.browseService.viewsCount();
  }

  hideAuthForm() {
    this.authFormType = null;
    this.isAuthFormVisible = false;
  }

  showAuthForm(type = 0) {
    this.authFormType = type;
    this.isAuthFormVisible = true;
  }

  verifyUser(text) {
    const token = localStorage.getItem('user_data');
    if (token === null) {
     // this.utilityService.toastr.error('Only logged user can ' + text, null, {positionClass: 'toast-top-center'});
      return this.showAuthForm(0);
    } else {
      this.isAuthFormVisible = false;
    }

  }

  getColor() {
    return;
  }

  unfollowChannel(game: any) {
    this.browseService.unfollowChannel(game).then( result => {
      this.ngOnInit();
    }).catch( err => {
      this.utilityService.toastr.error('Something is wrong ');
    });

  }

  async getFollowStatus() {

    const user = localStorage.getItem('user_data');
    if (user) {
      this.browseService.getfollowStatus(this.game).then(result => {
        const response: any = result;
        if (response.data === 'true') {
          this.followStatus = false;
        } else {
          this.followStatus = true;
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }

  async tagFilterLive(tag) {
    await this.browseService.filterByTag(tag);
    this.router.navigate(['/browse/channels']);
  }
  async tagFilter(tag) {
    await this.browseService.filterByTag(tag);
    this.router.navigate(['/browse/recentVideos']);
  }
  async tagFilterGame(tag) {
    await this.browseService.filterByTag(tag);
    this.router.navigate(['/browse/categories']);
  }
}
