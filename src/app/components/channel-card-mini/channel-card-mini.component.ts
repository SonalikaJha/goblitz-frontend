import { Component, OnInit, Input } from '@angular/core';

class Channel {
  title: string;
  views: string;
  subscribers: string;
  link: string;
  image: string;
  userProfile: string;
  userName: string;
  game: string;
}

@Component({
  selector: 'app-channel-card-mini',
  templateUrl: './channel-card-mini.component.html',
  styleUrls: ['./channel-card-mini.component.scss']
})
export class ChannelCardMiniComponent implements OnInit {

  @Input() channel: Channel;

  constructor() { }

  ngOnInit() {
  }

}
