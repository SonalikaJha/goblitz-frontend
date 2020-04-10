import { BrowseService } from 'src/app/services/browse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from './../../../environments/environment.prod';
import { StreamService } from './../../services/stream.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { UtilityService } from 'src/app/services/utility.service';


class RecommendedChannel {
  link: string;
  title: string;
  image: string;
  views: string;
  userProfile: string;
  userCover: string;
  userName: string;
  game: string;
  userCoverImage: string;
  gameImage: string;
  description: string;
  tags: Array<any>;
  streamId: string;
  bio: string;
  followersCount: Number;
  videoCount: Number;
  viewersCount: Number;
  totalPlaybackViews: Number;
  live: boolean;
}

@Component({
  selector: 'app-channel-card-two',
  templateUrl: './channel-card-two.component.html',
  styleUrls: ['./channel-card-two.component.scss']
})
export class ChannelCardTwoComponent implements OnInit {
  paramUserName: '';
  showModal = false;
  @Input() channel: RecommendedChannel;
  @Input() cardType: string;
  showDel = false;
  videoId = '';
  vedioIdCheck = ''

  constructor(private utils: UtilityService,
    private streamService: StreamService,
    private route: ActivatedRoute,
    private browseService: BrowseService,
    private Router: Router
  ) {
  }

  ngOnInit() {
    console.log('from live',this.channel)
    if (this.cardType == 'playbacks') {
      this.vedioIdCheck = this.route.params['value']['videoId'];
    }

    if (environment.baseUrl == 'http://goblitz.tv:3000') {
      this.showDel = false;
    } else if (environment.baseUrl == 'http://13.235.18.233:3000/') {
      this.showDel = true;
    }
    const token = JSON.parse(localStorage.getItem('user_data'));
    if (token !== null) {
      this.paramUserName = token['username']
    }

    if (this.cardType === 'channel') {

    } else {
      if (this.channel.link != "") {
        const temp = this.channel['link'].split('/');
        const temp1 = temp[temp.length - 1];
        const temp2 = temp1.split('.');
        this.videoId = temp2[0];
      }
      // }
    }
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  getImageUrl(url) {
    return this.utils.getImageUrl(url);
  }

  getRoute(channel: RecommendedChannel) {
    if (this.cardType == 'channel') {
      return '/' + channel.userName + '/channel';
      // return '/' + channel.userName + channel.link;
    } else {
      return '/' + channel.userName + '/playbacks/' + this.videoId;
    }
  }

  openStreamDialogBox(streamInfo) {
    this.utils.getStreamInfoById(streamInfo);
    this.utils.streamInfoDialog = true;
    this.showModal = false;
  }

  async deleteStreamAlert(streamInfo) {
    let vedioLink = [...streamInfo.link.split('/')];
    let vedioId = [...vedioLink[5].split('.')]

    let result = confirm("Are you sure to delete");
    if (result) {
      this.showModal = false;
      const res = await this.streamService.deleteStream(vedioId[0]);
    } else {
      this.showModal = false;
    }
  }

  filterByTagWise(tag) {
    if (this.cardType == 'playbacks') {
      this.browseService.filterTagValue(tag);
      this.Router.navigate(['/browse/recentVideos'])
    } else if(this.cardType == 'channel') {
      this.browseService.filterTagValue(tag);
      this.Router.navigate(['/browse/channels']);
    }

  }

}
