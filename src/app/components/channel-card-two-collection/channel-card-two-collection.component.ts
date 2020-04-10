import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import * as $ from 'jquery';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-channel-card-two-collection',
  templateUrl: './channel-card-two-collection.component.html',
  styleUrls: ['./channel-card-two-collection.component.scss']
})
export class ChannelCardTwoCollectionComponent implements OnInit {
  
  constructor(private utilityService: UtilityService,
      private route: ActivatedRoute
    ) { }

  get hasMoreChannels(): boolean {
    return this.channels.length > 4;
  }
  showRest = false;
  showAll = false;

  @Input() public channels: [];
  @Input() public cardType: string;
  @Input() public inContainer = true;
  @Input() public cardsToShow: any = [];

  previewChannels = [];
  restChannels = [];
  channelStatus = true;
  ngOnInit() {
    this.previewChannels = this.channels.slice(0, 4);
    this.restChannels = this.channels.slice(4, 8);

    // console.log('channel list from recpommended channel',this.channels)

  }

  toggleRest(event) {
    $(event.target).prev().slideToggle();
    this.showRest = !this.showRest;
  }

  clickonclick() {
    // console.log('hiiiii')
  }

  getchannel(item) {
      const obj = {
        link: item.playbackUrl,
        title: item['streamTitle'],
        image: this.utilityService.getImageUrl(item['streamImage']),
        views: item.totalPlaybackViews,
        userProfile: this.utilityService.getImageUrl(item['userProfileImage']),
        userName: item['username'],
        game: item['gameTitle'],
        userCoverImage: this.utilityService.getImageUrl(item['userCoverImage']),
        tags: item['streamTags'],
        description: item['streamDescription'],
        streamId: item['id'],
        totalPlaybackViews: item['totalPlaybackViews']
      }
      return obj;
    }

    getRoute() {
      if(!this.showRest) {
        // return '/' + this.route.params['value'].userName + '/channel'
      } else {
        if(this.cardType == 'playbacks'){
        return '/' + this.route.params['value'].userName +'/videos';
        }
      }
    }
    
  getAll() {
    if (this.channels.length > 8) {
      return 'See all';
    } else {
      this.channelStatus = false;
    }
  }

  selected(i) {
    console.log('=========>>>>>.', i);
  }
}
