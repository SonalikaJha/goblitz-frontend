import { HttpService } from './../../services/http.service';
import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {StreamService} from '../../services/stream.service';
import * as _ from 'underscore';
import {UtilityService} from '../../services/utility.service';
import {ChannelServiceService} from '../../services/channel-service.service';

@Component({
  selector: 'app-hero-carousel',
  templateUrl: './hero-carousel.component.html',
  styleUrls: ['./hero-carousel.component.scss']
})
export class HeroCarouselComponent implements OnInit {

  midIndex = 4;
  stream: any = {username: '', streamOutputUrl: ''}
  // stream = {
  //   streamOutputUrl: '',
  //   user: {
  //     username: '',
  //     profileImage: ''
  //   },
  //   gameDescription: '',
  //   game: {
  //     title: '',
  //     image: ''
  //   }
  // };
  recentBroadcasts = [];

  constructor(
    private streamService: StreamService,
    private utilityService: UtilityService,
    private channelService: ChannelServiceService,
    private http: HttpService
  ) {
  }

  async ngOnInit() {
    await this.getStream();
    this.channelService.getRecentBroadcasts().then(res => {
      console.log('hero carousal',res);
      // res.length = 5;
      if(res.length > 5) {
        res.length = 5;
      }
      console.log('check result',res)
       this.recentBroadcasts = res.filter(x => {
        return x.playbackUrl != "";
      });
      console.log('this.recentBroadcasts', this.recentBroadcasts);
      setTimeout(() => {
        this.initVerticalSlider('.vertical-slider');
      }, 500);
    });
  }

  initVerticalSlider(selector = '.vertical-slider') {
    const images = $(selector + ' .image-container');
    const total = images.length;
    images.eq(this._getMidIndex(total - 1, -1)).css({
      top: '40px',
      transform: 'scale(0.8)',
      'z-index': 50,
      bottom: 'auto',
      filter: 'contrast(0.3)'
    });
    images.eq(this._getMidIndex(total - 1, +0)).css({
      top: '70px',
      transform: 'scale(0.9)',
      'z-index': 51,
      bottom: 'auto',
      filter: 'contrast(0.5)'
    });
    images.eq(this._getMidIndex(total - 1, +1)).css({
      top: 'auto',
      'z-index': 52,
      transform: 'none',
      bottom: 'auto',
      filter: 'contrast(1)'
    });
    images.eq(this._getMidIndex(total - 1, +2)).css({
      top: 'auto',
      bottom: '70px',
      transform: 'scale(0.9)',
      'z-index': 51,
      filter: 'contrast(0.5)'
    });
    images.eq(this._getMidIndex(total - 1, +3)).css({
      top: 'auto',
      bottom: '40px',
      transform: 'scale(0.8)',
      'z-index': 50,
      filter: 'contrast(0.3)'
    });
  }

  

  getNext() {
    this.midIndex = this._getMidIndex(4, +1);
    this.initVerticalSlider();
  }

  getPrevious() {
    this.midIndex = this._getMidIndex(4, -1);
    this.initVerticalSlider();
  }

  _getMidIndex(lastIndex = 0, index = 0) {
    // console.log([lastIndex, this.midIndex, index]);
    let toReturn = this.midIndex;
    if (index === 0) {
      toReturn = this.midIndex;
    } else {
      if (index > 0) {
        if (this.midIndex + index > lastIndex) {
          toReturn = (this.midIndex + index) - (lastIndex + 1);
        } else {
          toReturn = this.midIndex + index;
        }
      } else {
        if (this.midIndex + index < 0) {
          toReturn = lastIndex + (this.midIndex + index) + 1;
        } else {
          toReturn = this.midIndex + index;
        }
      }
    }
    // console.log(toReturn);
    return toReturn;
  }

  private async getStream() {
    const response: any = await  this.http.get('v1/live-channels');
    if (!_.isEmpty(response.data)) {
      this.stream = response.data[0];
    }
    // console.log(response);
    console.log('this.stream', this.stream);
  }

  getImageUrl(url, type) {
    if (type === 'streamImage') {
      return this.utilityService.getImageUrl(url);
    }
    if (url === '') {
      return '../../../assets/images/no-profile-image.jpg';
    } else {
      return this.utilityService.getImageUrl(url);
    }
  }

  getPlaybackUrl(broadcast: any) {
    if(broadcast != undefined) {
      const playbackId = this.utilityService.getPlaybackIdFromLink(broadcast.playbackUrl);
    return '/' + broadcast.username + '/playbacks/' + playbackId;
    }
  }
}
