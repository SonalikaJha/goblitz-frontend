import { Params, ActivatedRoute } from '@angular/router';
import { UtilityService } from './../../services/utility.service';
import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as $ from 'jquery';

@Component({
  selector: 'app-recommended-channels',
  templateUrl: './recommended-channels.component.html',
  styleUrls: ['./recommended-channels.component.scss'],
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
export class RecommendedChannelsComponent implements OnInit {
  @Input() cardsToShow: any = [];
  showRest = false;
  recommendedChannelList: any = [];
  previewChannels = [];
  restChannels = [];

  recommendedChannels = {
    preview: [{
      link: '/channel',
      image: 'assets/images/no-game-cover.jpg',
      userProfile: 'assets/images/no-profile-image.jpg',
      title: 'Title of the game!',
      userName: 'aritct',
      game: 'PUBG'
    },
    {
      link: '/channel',
      image: 'assets/images/no-game-cover.jpg',
      userProfile: 'assets/images/no-profile-image.jpg',
      title: 'Title of the game!',
      userName: 'aritct',
      game: 'PUBG'
    },
    {
      link: '/channel',
      image: 'assets/images/no-game-cover.jpg',
      userProfile: 'assets/images/no-profile-image.jpg',
      title: 'Title of the game!',
      userName: 'aritct',
      game: 'PUBG'
    },
    {
      link: '/channel',
      image: 'assets/images/no-game-cover.jpg',
      userProfile: 'assets/images/no-profile-image.jpg',
      title: 'Title of the game!',
      userName: 'aritct',
      game: 'PUBG'
    },
    ],
    rest: [
      {
        link: '/channel',
        image: 'assets/images/no-game-cover.jpg',
        userProfile: 'assets/images/no-profile-image.jpg',
        title: 'Title of the game!',
        userName: 'aritct',
        game: 'PUBG'
      },
    ]
  };
  channelStatus = true;

  constructor(public utilityService: UtilityService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.getRecommendedList().then(res => {
      this.previewChannels = this.recommendedChannelList.slice(0, 4);
      this.restChannels = this.recommendedChannelList.slice(4,16);
    });

  }

  toggleRest(event) {
    $(event.target).prev().slideToggle();
    this.showRest = !this.showRest;
  }

  async getRecommendedList() {
    let res = await this.utilityService.getRecommendedChannelList();
    this.recommendedChannelList = res['data'];
  }

  getChannel(item) {
    const obj = {
      link: '',
      title: item['gameTitle'],
      image: this.utilityService.getImageUrl(item['image']),
      views: item.totalPlaybackViews,
      userProfile: this.utilityService.getImageUrl(item['userProfileImage']),
      userName: item['username'],
      game: item['gameTitle'],
      userCoverImage: this.utilityService.getImageUrl(item['userCoverImage']),
      followersCount: item['followersCount'],
      videoCount: item['videoCount'],
      viewersCount: item['viewersCount'],
      bio: item['bio']

    }
    return obj;
  }

  getRoute() {
    if(!this.showRest) {
      // return '/' + this.route.params['value'].userName + '/channel'
    } else {
      return '/browse/allChannels';

    }
  }

  getAll() {
    if (this.recommendedChannelList.length > 16) {
      return 'See all';
    } else {
      this.channelStatus = false;
    }

  }
}
