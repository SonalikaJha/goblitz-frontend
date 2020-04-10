import { UtilityService } from 'src/app/services/utility.service';
import { Component, OnInit, Input } from '@angular/core';

class Channel {
  name: string;
  views: Number;
  subscribers: string;
  link: string;
  userProfileImage: string;
  followersCount: Number;
}

@Component({
  selector: 'app-channel-card',
  templateUrl: './channel-card.component.html',
  styleUrls: ['./channel-card.component.scss']
})
export class ChannelCardComponent implements OnInit {

  @Input() channel: Channel;

  constructor(private utilityService:UtilityService) { }

  ngOnInit() {
    console.log('popular channle ',this.channel);
  }

  getImageUrl(url) {
      return this.utilityService.getImageUrl(url);
  }

  getRoute(channel: Channel) {
      return '/' + channel.name + '/channel';
  }

}
