import { Component, OnInit } from '@angular/core';
import {BrowseService} from '../../../services/browse.service';
import {UtilityService} from '../../../services/utility.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-recent-videos',
  templateUrl: './recent-videos.component.html',
  styleUrls: ['./recent-videos.component.scss']
})
export class RecentVideosComponent implements OnInit {
  playBacksVideos: any;
  tagsArray = [];
  baseUrl = environment.baseUrl;
  tagSerch=[];
  alltag=[];
  searchText = '';
  constructor(private browseService: BrowseService, private utils: UtilityService, private router: Router) { }

  ngOnInit() {
    this.getRecentPlayBack('');
    this.getTagList();
  }

  addTags(tag) {
    this.tagSerch.push(tag);
    this.browseService.filterTagValue(tag);
   
    
  }

  async getTagList() {
    const response: any = await this.browseService.getAllTagsList();
    this.alltag = response.data;
  }

  async getRecentPlayBack(event) {
    const response: any = await this.browseService.getRecentVideo();
    this.playBacksVideos = response.data;

    // @ts-ignore
    //const searchText = await this.route.params.value.text;
    
    console.log("this.searchText",this.searchText );
    if(this.searchText!==''){
      const filterData = [];
      this.playBacksVideos.map(ch => {

        if (ch.gameTitle.toLowerCase().includes(this.searchText.toLowerCase()) || ch.streamTitle.toLowerCase().includes(this.searchText.toLowerCase())  || ch.username.toLowerCase().includes(this.searchText.toLowerCase() ) ){
          filterData.push(ch);
        } else {
          ch.streamTags.forEach(t => {
            if (t.toLowerCase().includes(this.searchText.toLowerCase())) {
              filterData.push(ch);
            }
          });
        }
      });
      this.playBacksVideos = filterData;
      // this.searchText='';
     
    }

    this.searchTagFilter(this.browseService.getFilterTagValue());
    this.addTag(this.browseService.getTagValue());
  }

  searchTagFilter(tag) {
    if (tag.length > 0 && tag != '') {
      tag.forEach(element => {
        this.tagsArray.push(element);

      });
      const games = [];
      this.playBacksVideos.map(game => {
        if ( game.streamTags.lenght != 0) {
          if (this.isSubset(game.streamTags, this.tagsArray)) {
            games.push(game);
          }
        }
      });
      this.playBacksVideos = games;
    }
  }

  isSubset(arr1, arr2) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        return false;
      }
    }
    return true;
  }
  getImageUrl(url) {
    return this.utils.getImageUrl(url);
  }

  async tagFilter(tag) {
    await this.browseService.filterByTag(tag);
    this.router.navigate(['/browse/categories']);
  }

  async  removeTag(tag) {
    this.browseService.removeTagInsearch(tag);
    const response: any = await this.browseService.getRecentPlayBacks();

    let data = response.data;
    let gamess = [];

    this.tagsArray.forEach(tags => {
      if (tags !== tag) {
        gamess.push(tags);
      }

    });
    this.tagsArray = gamess;

    let games = [];
    data.forEach(async game => {
      if (this.isSubset(game.streamTags, this.tagsArray)) {

        await games.push(game);

      }
    });

    this.playBacksVideos = games;

  }
  addTag(tag) {
    if(tag != ''){
      if (!this.tagsArray.includes(tag)) {
        this.tagsArray.push(tag);
        this.browseService.filterTagValue(tag);
      }
    }

    let games = [];
    this.playBacksVideos.map(game => {
      if (this.isSubset(game.streamTags, this.tagsArray)) {
        games.push(game);
      }
    });

    this.playBacksVideos = games;

  }
  
}
