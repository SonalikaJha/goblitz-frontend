import { AuthService } from './../../services/auth.service';
import { UtilityService } from './../../services/utility.service';
import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {ActivatedRoute, NavigationEnd} from '@angular/router';
import {StreamService} from '../../services/stream.service';
import {Router} from '@angular/router';
import {BrowseService} from '../../services/browse.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playbacks-page',
  templateUrl: './playbacks-page.component.html',
  styleUrls: ['./playbacks-page.component.scss']
})
export class PlaybacksPageComponent implements OnInit {
  loginUserName = '';
  authFormType: number;
  isAuthFormVisible: boolean;
  follwersCount = ''
  followStatus: boolean;
  paramUserName = '';
  messageSubscription: Subscription;
  filteredBroadcastList: any = [];
  videoId = '';
  playbackUrl = '';
  userdata: any;
  playBackObject:any = {};
  routes = {
    getPlaybackUrl: 'playback-url/'
  };

  recent = [];
  recommendedBroadCastFilter: any = [];

  userName: string;

  recommended = [
    {
      link: '',
      image: 'assets/images/no-game-cover.jpg',
      userProfile: 'assets/images/no-profile-image.jpg',
      title: 'Title of the game!',
      userName: 'jhon',
      game: 'PUBG'
    }, {
      link: '',
      image: 'assets/images/no-game-cover.jpg',
      userProfile: 'assets/images/no-profile-image.jpg',
      title: 'Title of the game!',
      userName: 'jhon',
      game: 'PUBG'
    }, {
      link: '',
      image: 'assets/images/no-game-cover.jpg',
      userProfile: 'assets/images/no-profile-image.jpg',
      title: 'Title of the game!',
      userName: 'jhon',
      game: 'PUBG'
    }, {
      link: '',
      image: 'assets/images/no-game-cover.jpg',
      userProfile: 'assets/images/no-profile-image.jpg',
      title: 'Title of the game!',
      userName: 'jhon',
      game: 'PUBG'
    }, {
      link: '',
      image: 'assets/images/no-game-cover.jpg',
      userProfile: 'assets/images/no-profile-image.jpg',
      title: 'Title of the game!',
      userName: 'jhon',
      game: 'PUBG'
    }, {
      link: '',
      image: 'assets/images/no-game-cover.jpg',
      userProfile: 'assets/images/no-profile-image.jpg',
      title: 'Title of the game!',
      userName: 'jhon',
      game: 'PUBG'
    }, {
      link: '',
      image: 'assets/images/no-game-cover.jpg',
      userProfile: 'assets/images/no-profile-image.jpg',
      title: 'Title of the game!',
      userName: 'jhon',
      game: 'PUBG'
    }];
  liveStreams = [];

  constructor(private router: Router,
              private http: HttpService,
              private route: ActivatedRoute,
              private streamService: StreamService,
              private browseService: BrowseService,
              public utilityService: UtilityService,
              public authService: AuthService
              ) {
                
    // force route reload whenever params change;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  async ngOnInit() {
    this.getfollowers()
    this.paramUserName = this.route.params['value'].userName;
    this.messageSubscription = this.streamService.getMessage().subscribe(message => {
      this.recommendedBroadCastFilter = [];
      this.filteredBroadcastList = [];
      this.browseService.getRecentBroadcasts(this.route.params['value'].userName).then(res => {
        if (res['data'].length != 0) {
          this.getRecentBroadcastListByUsername();
          this.recommendedBroadCastFilter = this.filteredBroadcastList.sort((x, y) => {
            return y.totalPlaybackViews - x.totalPlaybackViews;
          })
        }
      })
    })
    this.utilityService.getgames();
      this.utilityService.getTags();
      this.getfollowUnfollowStatus();
      this.authService.currentUser.subscribe(res => {
        // console.log('subscribe result', res)
        this.loginUserName = res.username;
        // console.log('param username', this.paramUserName);
      });
    
    this.route.paramMap.subscribe(async paramMap => {
      this.userName = paramMap.get('userName');
    });
    
    // await this.getRecentPlaybacks();
    this.browseService.getRecentBroadcasts(this.userName).then(res => {
      // console.log('ten block run', res)
      if (res['data'].length != 0) {
        this.getRecentBroadcastListByUsername()
        this.recommendedBroadCastFilter = this.filteredBroadcastList.sort((x,y) => {
          return y.totalPlaybackViews - x.totalPlaybackViews;
        })
        
      }
    }
    );
    await this.getStreams();
    this.streamService.getStreamInfo(this.userName).then(res => {
      
      console.log('this is stream res',res);
      this.userdata = res['data'];
      this.userdata['user'].profileImage = this.utilityService.getImageUrl(this.userdata['user'].profileImage);
    })

    this.getVideoId();
    
  }

   getRecentBroadcastListByUsername() {
     this.filteredBroadcastList =  this.browseService.recentBroadcastList.filter(x => {
      return  x.playbackUrl != "";
    });
  }

  getVideoId() {
    return this.route.paramMap.subscribe(async paramMap => {
      this.videoId = paramMap.get('videoId');
      this.getPlaybackUrl();
    });
  }

  async getPlaybackUrl() {
    
    this.playbackUrl = '';
    console.log('this.routes.getPlaybackUrl',);
    // @ts-ignore
    let id = "";
    id = this.videoId;
    const res = await this.http.get('playback-url/' + this.videoId, true, {})
    this.recommendedBroadCastFilter.filter(ele =>{
      if(ele.playbackId === id) {
        this.playBackObject =  ele;
      }
    })
    console.log('object from play back',this.playBackObject)
    this.playbackUrl = res['data'].url; 
  }

  async getRecentPlaybacks() {
    const response = await this.streamService.getRecentPlaybacks(this.userName);
    // @ts-ignore
    this.recent = response.data.result;
  }

  async getStreams() {
    const response: any = await this.browseService.getLiveChannelList();
    let liveDataArray = response.data;
    liveDataArray.forEach(element => {
      if(element.username == this.userName) {
        element['userCoverImage'] = element['streamImage'];
        this.liveStreams.push(element);
      }
    });
  }

  getImage(url) {
    return this.utilityService.getImageUrl(url)
  }

  getFollower() {
    let user = localStorage.getItem('user_data');
    let userdata = JSON.parse(user);
    //@ts-ignores
    this.router.navigate(['/' + this.route.params.value.userName + '/followers']);
  }
  getvideos() {
    const user = localStorage.getItem('user_data');
    const userdata = JSON.parse(user);
    //@ts-ignores

    this.router.navigate(['/' + this.route.params.value.userName + '/videos']);
  }

  filterByTagWise(tag) {
    
      this.browseService.filterTagValue(tag);
      this.router.navigate(['/browse/recentVideos'])
  }
  async followChannel() {
    console.log('called follow channel');
    // await this.verifyUser('follow');

    const user = localStorage.getItem('user_data');
    if (user) {
      this.browseService.followUserChannel(this.paramUserName).then(result => {
        // this.utilityService.toastr.success('You followed successfully!!');
        this.followStatus = false;
        this.getfollowers()
      }).catch(err => {
        this.utilityService.toastr.error(err);
      });
    } else {
      this.utilityService.toastr.error('Only logged user can follow', '', { positionClass: 'toast-top-center' });
      return this.showAuthForm(0);
    }

  }

  async getfollowUnfollowStatus() {
    // @ts-ignore
    const userName = this.route.params.value.userName;
    const user = localStorage.getItem('user_data');
    if (user) {
      const response: any = await this.browseService.getfollowUnfollowChannelStatus(userName);
      if (response.data === 'true') {
        this.followStatus = false;
      } else {
        this.followStatus = true;
      }
    } else {
      this.followStatus = true;
    }

  }

  showAuthForm(type = 0) {
    this.authFormType = type;
    this.isAuthFormVisible = true;
  }

  verifyUser(text) {
    const token = localStorage.getItem('user_data');
    if (token === null) {
      console.log('user not log in');
      this.utilityService.toastr.error('Only logged user can ' + text, null, { positionClass: 'toast-top-center' });
      return this.showAuthForm(0);
    } else {
      console.log('user logged in');
      this.isAuthFormVisible = false;
    }
  }

  
  hideAuthForm() {
    this.authFormType = null;
    this.isAuthFormVisible = false;
  }

  async unFollowChannel() {
    this.browseService.unfollowUserChannel(this.paramUserName)
      .then(result => {
        console.log(result);
        this.followStatus = true;
        this.getfollowers()
      })
      .catch(err => {
        console.log(err);
        this.utilityService.toastr.error(err);
      });
  }

  async getfollowers() {
    const res = await this.browseService.getFollowersList(this.route.params['value'].userName);
    console.log('follwer count ', res)
    this.follwersCount = res['message'];
  }


}
