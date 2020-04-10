import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {UtilityService} from '../../services/utility.service';
import * as $ from 'jquery';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-live-channels',
  templateUrl: './live-channels.component.html',
  styleUrls: ['./live-channels.component.scss'],
  animations: [
    trigger('toggle', [
      state('open', style({
        height: '100%'
      })),
      state('close', style({
        height: '0%'
      })),
      transition('open => close', [
        animate('0.3s')
      ]),
      transition('close => open', [
        animate('0.3s')
      ])
    ])
  ]
})
export class LiveChannelsComponent implements OnInit {

  constructor(public utilityService: UtilityService, private http: HttpService) {
  }

  @Input() cardsToShow: Array<any>;
  cardsFour = [0, 1, 2, 3];
  cardsRest = [4, 5, 6, 7];
  restChannels: any = [];
  previewChannels: any = [];
  showRest = false;
  liveChannels = [
    {
      link: '/channel',
      image: 'assets/images/no-game-cover.jpg',
      userProfile: 'assets/images/no-profile-image.jpg',
      title: 'Title of the game!',
      userName: 'aritct',
      game: 'PUBG',
      streamOutputUrl: ''
    }
  ];
  channelStatus = true;

  async ngOnInit() {
    this.getLiveChannelList().then(res => {
      this.previewChannels = this.liveChannels.slice(0, 4);
      this.restChannels = this.liveChannels.slice(4, 8);
      console.log('this. preview channels', this.previewChannels);
      console.log('this. rest channels', this.restChannels);
    });
  }

  toggleRest(event) {
    $(event.target).prev().slideToggle();
    this.showRest = !this.showRest;
  }

  async getLiveChannelList() {
    const response: any = await this.http.get('v1/live-channels');
    const data = response.data;
    const filtered = data.splice(0, 1);
    this.liveChannels = data;
    console.log('this.live channels is working ', this.liveChannels);
    // let data = response.data;
    // this.liveChannels = data.splice(0, 1);

    // console.log('response', response);
  }

  getChannelObject(item) {
    const obj = {
      link: '',
      title: item.streamTitle,
      image: this.utilityService.getImageUrl(item.image),
      views: item.totalPlaybackViews,
      userProfile: this.utilityService.getImageUrl(item.userProfileImage),
      userName: item.username,
      game: item.gameTitle,
      userCoverImage: this.utilityService.getImageUrl(item.streamImage),
      tags: item.streamTags,
      live: true
    };
    return obj;
  }
  getRoute() {
    if (!this.showRest) {
      // return '/' + this.route.params['value'].userName + '/channel'
    } else {
      return '/browse/channels';

    }
  }
  getAll() {
    if (this.liveChannels.length > 8) {
      return 'See all';
    } else {
      this.channelStatus = false;
    }

  }
}
