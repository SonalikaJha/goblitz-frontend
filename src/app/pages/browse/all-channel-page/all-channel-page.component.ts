import { UtilityService } from './../../../services/utility.service';
import {Component, OnInit} from '@angular/core';
import {BrowseService} from 'src/app/services/browse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-channel-page',
  templateUrl: './all-channel-page.component.html',
  styleUrls: ['./all-channel-page.component.scss']
})
export class AllChannelPageComponent implements OnInit {

  allChannelPage: any;
  tagsArray = [];
  prevallChannels: any;
  afterallChannels: any;
  searchText = '';
  alltag=[];
  tagSerch=[];
  constructor(private browseService: BrowseService,
              private utilityService: UtilityService,
              private route: ActivatedRoute,
              private router: Router,
              // private utils: UtilityService,
  ) {
  }

  async ngOnInit() {
    this.getTagList();
    await this.getAllChannelList('');
    // await this.getAllChannelPageList();
    this.browseService.channelStatus(false);
  }

  getItem(item) {
    console.log('item from all channel ',item)
    const obj = {
      link: '',
      title: item['gameTitle'],
      bio: item['bio'],
      image: this.utilityService.getImageUrl(item['image']),
      views: item.totalPlaybackViews,
      userProfile: this.utilityService.getImageUrl(item['userProfileImage']),
      userName: item['username'],
      followersCount: item['followersCount'],
      videoCount: item['videoCount'],
      viewersCount: item['viewersCount'],
      
      // game: item['gameTitle'],
      userCoverImage: this.utilityService.getImageUrl(item['userCoverImage'])
    }
    console.log('objjjjj',obj)
    return obj;
  }
  async getTagList() {
    const response: any = await this.browseService.getAllTagsList();
    this.alltag = response.data;
  }
  addTags(tag) {
    this.tagSerch.push(tag);
    this.browseService.filterTagValue(tag);
   
    
  }

  async getAllChannelList(event) {
    console.log("event", event);

    const response: any = await this.browseService.getAllChannelPageList();
    this.allChannelPage = response.data;

    // @ts-ignore
    //const searchText = await this.route.params.value.text;
    
    console.log("this.searchText",this.searchText );
    if(this.searchText!==''){
      const filterData = [];
      this.allChannelPage.map(ch => {

        if (ch.gameTitle.toLowerCase().includes(this.searchText.toLowerCase()) || ch.streamDescription.toLowerCase().includes(this.searchText.toLowerCase()) || ch.username.toLowerCase().includes(this.searchText.toLowerCase())) {
          filterData.push(ch);
        } else {
          ch.streamTags.forEach(t => {
            if (t.toLowerCase().includes(this.searchText.toLowerCase())) {
              filterData.push(ch);
            }
          });
        }
      });
      this.allChannelPage = filterData;
       this.searchText='';
     
    }
    this.addTag(this.browseService.getTagValue());
  }

  async  removeTag(tag) {
    this.browseService.removeTagInsearch(tag);
    const response: any = await this.browseService.getAllChannelPageList();

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

    this.allChannelPage = games;

  }
  addTag(tag) {
    if(tag != ''){
      if (!this.tagsArray.includes(tag)) {
        this.tagsArray.push(tag);
        this.browseService.filterTagValue(tag);
      }
    }

    let games = [];
    this.allChannelPage.map(game => {
      if (this.isSubset(game.streamTags, this.tagsArray)) {
        games.push(game);
      }
    });

    this.allChannelPage = games;

  }
  isSubset(arr1, arr2) {
    for (var i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        return false;
      }
    }
    return true;
  }

  getImageUrl(url) {
    return this.utilityService.getImageUrl(url);

  }
  getRoute(channel) {
    this.router.navigate(['/'+channel.username+ '/channel']);
  }

}
