import { Component, OnInit } from '@angular/core';
import { BrowseService } from 'src/app/services/browse.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-channel-page',
  templateUrl: './channel-page.component.html',
  styleUrls: ['./channel-page.component.scss']
})
export class ChannelPageComponent implements OnInit {
  liveChannel: any;

  data = [];
  tagsArray = [];
  visible: boolean = true;
  tagSerch=[];
  alltag=[];
  searchText = '';
  live = false;


  constructor(private browseService: BrowseService,
    private utils: UtilityService,
    private router: Router, ) {
  }

  async ngOnInit() {
   this.getLiveChannelList('');
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

  async getLiveChannelList(event) {
    this.live=true;
    const response: any = await this.browseService.getLiveChannelList();
    this.liveChannel = response.data;
    // @ts-ignore
    //const searchText = await this.route.params.value.text;
    
    console.log("this.searchText",this.searchText );
    if(this.searchText!==''){
      const filterData = [];
      this.liveChannel.map(ch => {

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
      this.liveChannel = filterData;
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
      let games = [];
      this.liveChannel.map(game => {
        if ( game.streamTags.lenght != 0) {
          if (this.isSubset(game.streamTags, this.tagsArray)) {
            games.push(game);
          }
        }
      });
      this.liveChannel = games;
    }
  }

  getImageUrl(url) {
    return this.utils.getImageUrl(url);
  }

  getRoute(channel) {
    this.router.navigate(['/'+channel.username+ '/channel']);
  }

  // addTag(tag) {
  //
  //     // this.tagsArray.push(tag);
  //     // let games = [];
  //     // console.log('this.tagsArray', this.tagsArray);
  //     // this.liveChannel.map(game => {
  //     //   if (this.isSubset(game.streamTags, this.tagsArray)) {
  //     //     games.push(game);
  //     //     console.log("hii game");
  //     //   }
  //     // });
  //
  //     // this.liveChannel = games;
  //     this.browseService.filterByTag(tag);
  //     this.router.navigate(['browse/categories']);
  // }
  isSubset(arr1, arr2) {
    for (var i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        return false;
      }
    }
    return true;
  }

  async  removeTag(tag) {
    this.browseService.removeTagInsearch(tag);
    const response: any = await this.browseService.getLiveChannelList();

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

    this.liveChannel = games;

  }

  addTag(tag) {
    if(tag != ''){
      if (!this.tagsArray.includes(tag)) {
        this.tagsArray.push(tag);
        this.browseService.filterTagValue(tag);
      }
    }

    let games = [];
    this.liveChannel.map(game => {
      if (this.isSubset(game.streamTags, this.tagsArray)) {
        games.push(game);
      }
    });

    this.liveChannel = games;

  }


}
