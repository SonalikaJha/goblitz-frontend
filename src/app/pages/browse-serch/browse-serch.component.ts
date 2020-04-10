import { Component, OnInit, Output } from '@angular/core';
import {StreamService} from '../../services/stream.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from '../../services/utility.service';
import { HttpService } from 'src/app/services/http.service';
import {BrowseService} from '../../services/browse.service';
import {environment} from '../../../environments/environment';
import { EventEmitter } from 'protractor';
import * as $ from 'jquery';

@Component({
  selector: 'app-browse-serch',
  templateUrl: './browse-serch.component.html',
  styleUrls: ['./browse-serch.component.scss']
})
export class BrowseSerchComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  constructor(  private browseService: BrowseService, private router: Router, private route: ActivatedRoute, private utils: UtilityService, private streamService: StreamService) { }

  // tslint:disable-next-line:max-line-length
  prevPlayBacksVideos: any;
  afterPlayBacksVideos: any;
  prevGames: any;
  afterGames: any;
  prevliveChannels: any;
  afterliveChannels: any;
  prevallChannels: any;
  afterallChannels: any;
  showRestGames = false;
  showRestVideos = false;
  showRestAllChannel = false;
  showRest = false;
  liveChannels: any;
  allChannels: any;
  playBacksVideos: any;
  videoStatus = false;
  games: any;
  searchData: any;
  baseUrl = environment.baseUrl;
  searchingText = '';
  allChannelStatus = true;
  liveChannelstatus = true;
  playBackStatus = true;
  gameStatus = true;
  ngOnInit() {
    console.log('page not refresh');
   // this.searchList();
    this.getLiveChannelList();
    this.getAllChannelList();
    this.getRecentPlayBack();
    this.getCategorylList();
    // @ts-ignore
    this.searchingText = this.route.params.value.text;
  }


 async searchList() {

  // console.log('in redirected url');
   // @ts-ignore
  const searchText = await this.route.params.value.text;
  // console.log('param::', searchText);
  const response: any = await this.streamService.search(searchText);
  this.searchData = response.data;

  this.searchData.liveChannels.forEach( async ch => {
    if (ch.playbackUrl !== null && ch.playbackUrl !== undefined) {

      const plays = await ch.playbackUrl.split('/');
      const url = await plays[plays.length - 1].split('.');
      // console.log('video user', url[0]);
      ch.playbackUrl = url[0];
    }
  });
  // console.log('search data', this.searchData);
 }

 getImageUrl(url) {
  return this.utils.getImageUrl(url);
}
getprofileImageUrl(url) {
  return this.utils.getprofileImageUrl(url);
}
 async getPlaybackUrl(videoUrl) {

   const videoId = videoUrl.split('.');
  // const url = await this.streamService.getPlaybackUrl(videoId[0]);
  // console.log('return-id', url);

   return videoId[0];
}
  async getLiveChannelList() {


    this.videoStatus = false;
    this.liveChannelstatus = true;

    const response: any  = await this.browseService.getLiveChannelList();
    this.liveChannels = response.data;

    // this.liveChannels.forEach( async ch => {
    //   if (ch.playbackUrl !== null && ch.playbackUrl !== undefined) {
    //
    //     const plays = await ch.playbackUrl.split('/');
    //     const url = await plays[plays.length - 1].split('.');
    //     console.log('video user', url[0]);
    //     ch.playbackUrl = url[0];
    //   }
    // });
    console.log('live channels', this.liveChannels);
    // @ts-ignore
    const searchText = await this.route.params.value.text;
    console.log('param::', searchText);


    const filterData = [];
    this.liveChannels.map(ch => {
      // tslint:disable-next-line:max-line-length
      if (ch.gameTitle.toLowerCase().includes(searchText.toLowerCase()) || ch.streamDescription.toLowerCase().includes(searchText.toLowerCase()) || ch.username.toLowerCase().includes(searchText.toLowerCase())) {
        filterData.push(ch);
      } else {
        ch.streamTags.forEach(t => {
          if (t.toLowerCase().includes(searchText.toLowerCase())) {
            filterData.push(ch);
          }
        });
      }
    });
    this.liveChannels = filterData;
    this.prevliveChannels = this.liveChannels.slice(0, 4);
    this.afterliveChannels = this.liveChannels.slice(4, 8);
  }

  async getAllChannelList() {


    this.videoStatus = false;
    this.liveChannelstatus = true;

    const response: any  = await this.browseService.getAllChannelPageList();
    this.allChannels = response.data;

    // this.liveChannels.forEach( async ch => {
    //   if (ch.playbackUrl !== null && ch.playbackUrl !== undefined) {
    //
    //     const plays = await ch.playbackUrl.split('/');
    //     const url = await plays[plays.length - 1].split('.');
    //     console.log('video user', url[0]);
    //     ch.playbackUrl = url[0];
    //   }
    // });
    console.log('all channels', this.allChannels);
    // @ts-ignore
    const searchText = await this.route.params.value.text;
    console.log('param::', searchText);


    const filterData = [];
    this.allChannels.map(ch => {
      // tslint:disable-next-line:max-line-length
      if (ch.gameTitle.toLowerCase().includes(searchText.toLowerCase()) || ch.streamDescription.toLowerCase().includes(searchText.toLowerCase()) || ch.username.toLowerCase().includes(searchText.toLowerCase())) {
        filterData.push(ch);
      } else {
        ch.streamTags.forEach(t => {
          if (t.toLowerCase().includes(searchText.toLowerCase())) {
            filterData.push(ch);
          }
        });
      }
    });
    this.allChannels = filterData;
    this.prevallChannels = this.allChannels.slice(0, 4);
    this.afterallChannels = this.allChannels.slice(4, 8);
  }

  async getRecentPlayBack() {
    this.videoStatus = true;
    this.liveChannelstatus = false;
    const response: any  = await this.browseService.getRecentPlayBacks();
    this.playBacksVideos = response.data;

    // this.playBacksVideos.forEach( async ch => {
    //   if (ch.playbackUrl !== null && ch.playbackUrl !== undefined) {

    //     const plays = await ch.playbackUrl.split('/');
    //     const url = await plays[plays.length - 1].split('.');
    //     // console.log('video user', url[0]);
    //     ch.playbackUrl = url[0];
    //   }
    // });
    const filterData = [];
    // @ts-ignore
    const searchText = await this.route.params.value.text;
    this.playBacksVideos.map(ch => {
      // tslint:disable-next-line:max-line-length
      if (ch.gameTitle.toLowerCase().includes(searchText.toLowerCase()) || ch.streamDescription.toLowerCase().includes(searchText.toLowerCase()) || ch.username.toLowerCase().includes(searchText.toLowerCase())) {
        filterData.push(ch);
      } else {
        ch.streamTags.forEach(t => {
          if (t.toLowerCase().includes(searchText.toLowerCase())) {
            filterData.push(ch);
          }
        });
      }
    });
    this.playBacksVideos = filterData;
    this.prevPlayBacksVideos = this.playBacksVideos.slice(0, 4);
    this.afterPlayBacksVideos = this.playBacksVideos.slice(4, 8);
    console.log('slice videos', this.playBacksVideos);
  }

  async getCategorylList() {
    const response: any = await this.browseService.getCategorylList();
    const data = response.data;

    const filterData = [];
    // @ts-ignore
    const searchText = await this.route.params.value.text;
    console.log('games data::', data);
    data.forEach(ch => {

      // tslint:disable-next-line:triple-equals max-line-length
      if ( (ch.title != '' && ch.title.toLowerCase().includes(searchText.toLowerCase())) || (ch.description != '' && ch.description.toLowerCase().includes(searchText.toLowerCase()))) {
        filterData.push(ch);
      } else {
        // tslint:disable-next-line:triple-equals
          ch.tags.forEach(t => {
            // tslint:disable-next-line:triple-equals
              if (t.toLowerCase().includes(searchText.toLowerCase())) {
               // console.log('t.tag.toLowerCase()', t.tag.toLowerCase(), searchText.toLowerCase());
                filterData.push(ch);
              }
          });
      }
    });
    this.games = filterData;
    this.prevGames = this.games.slice(0, 5);
    this.afterGames = this.games.slice(5, 10);
    console.log('games::', this.games);
  }

  async tagFilter(tag) {
    await this.browseService.filterByTag(tag);
    this.router.navigate(['/browse/categories']);
  }
  async tagFilterlive(tag) {
    await this.browseService.filterByTag(tag);
    this.router.navigate(['/browse/channels']);
  }
  async tagFilterAllChannel(tag) {
    await this.browseService.filterByTag(tag);
    this.router.navigate(['/browse/allChannels']);
  }
  async tagFilterVideos(tag) {
    await this.browseService.filterByTag(tag);
    this.router.navigate(['/browse/recentVideos']);
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

  getGameRoute() {
    if (!this.showRestGames) {
      // return '/' + this.route.params['value'].userName + '/channel'
    } else {
      return '/browse/categories';

    }
  }
  toggleRestGames(event) {
    $(event.target).prev().slideToggle();
    this.showRestGames = !this.showRestGames;
  }

  getRouteAllChannel() {
    if (!this.showRestAllChannel) {
      // return '/' + this.route.params['value'].userName + '/channel'
    } else {
      return '/browse/allChannels';

    }
  }
  toggleRestAllChannel(event) {
    $(event.target).prev().slideToggle();
    this.showRestAllChannel = !this.showRestAllChannel;
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
  getAll() {
    if (this.allChannels.length > 8) {
      return 'See all';
    } else {
      this.allChannelStatus = false;
      return '';
    }
  }
  getAllLive() {
    if (this.liveChannels.length > 8) {
      return 'See all';
    } else {
      this.liveChannelstatus = false;
      return '';
    }
  }
  getAllPlayBacks() {
    if (this.playBacksVideos.length > 8) {
      return 'See all';
    } else {
      this.playBackStatus = false;
      return '';
    }
  }
  getAllGames() {
    if (this.games.length > 8) {
      return 'See all';
    } else {
      this.gameStatus = false;
      return '';
    }
  }


  gotoGame(title){
    let first="";
    if(title.includes(" ")){
      let arr=title.split(" ");
      first=arr[0];
      for(let i=1;i<arr.length;i++){
        first=first+'-'+arr[i];
      } 
    }else {
        first=title;
    }
      console.log(first);
      //this.router.naviagte(['/game'])
      return "/game/"+first;
    
  }
}
