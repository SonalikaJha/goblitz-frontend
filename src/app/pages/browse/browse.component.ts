import { UtilityService } from './../../services/utility.service';
import { Component, OnInit } from '@angular/core';
import { BrowseService } from 'src/app/services/browse.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  alltag = [];
  tagSerch = [];
  channelStatus = true;
  allChannelPage=[];


  constructor(public utilityService: UtilityService,
    private browseService: BrowseService,
    private router: Router,
    private utils: UtilityService,) { }

  ngOnInit() {

    this.getRecommendedList();
    this.getAllChannelPageList(); 
    this.getTagList();
    let urls = this.router.url.split('/');
    this.allChannel(urls[urls.length - 1]);
    if (!this.browseService.getChannelStatus()) {
      this.channelStatus = false;
    }


  }
  async getAllChannelPageList() {
    const response: any = await this.browseService.getAllChannelPageList();
    this.allChannelPage = response.data.slice(0,4);
     }

  getImageUrl(url) {
    return this.utils.getImageUrl(url);
  }

  getRecommendedList() {
    this.utilityService.getRecommendedChannelList();
  }
  async getTagList() {
    const response: any = await this.browseService.getAllTagsList();
    this.alltag = response.data;
  }
  addTag(tag) {
    this.tagSerch.push(tag);
    this.browseService.filterTagValue(tag);
    this.router.navigated = false;
    let urls = this.router.url.split('/');
    if (urls[urls.length - 1] == 'allCahnnels') {
      this.channelStatus = false;
    }
    this.router.navigate(['browse/' + urls[urls.length - 1]]);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  allChannel(url) {
    if (url == 'allCahnnels') {
      this.channelStatus = false;
      this.router.navigate(['/browse/allChannels']);

    } else {
      this.channelStatus = true;
    }

  }
}
