import { StreamService } from './../../../../services/stream.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BrowseService } from 'src/app/services/browse.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, OnDestroy {
  messageSubscription: Subscription;
  videos = [];
  tagsArray = [];
  paramUserName = '';
  videoUserName=[];
  filteredBroadcastList: any = [];
  recommendedBroadCastFilter: any = [];

  constructor(private browseService: BrowseService,
    public utils: UtilityService, private router: Router,
    private route: ActivatedRoute,
    private streamService: StreamService
    ) { }

  ngOnInit() {
    this.messageSubscription = this.streamService.getMessage().subscribe(message => {
      this.getVideo();
    })
    this.getVideo();
    this.utils.getgames();
    this.utils.getTags();
    const token = JSON.parse(localStorage.getItem('user_data'));
    if (token !== null) {
      this.paramUserName = token['username']
    }
   
  }
  async getVideo() {

    //@ts-ignores
    const username = this.route.params.value.userName;
    this.videoUserName= username;
    const response: any = await this.browseService.getVideoList(username);
    this.videos = response.data;
    let filterVideo=[];
    this.videos.forEach(e=>{
      if(e.playbackUrl != "" && e.playbackUrl != null )
      {
        filterVideo.push(e)
      }
    });
    this.videos= filterVideo;
    console.log("filterVideo", filterVideo)

  }


  getImageUrl(url) {
    return this.utils.getImageUrl(url);
  }

  addTag(tag) {
    if (!this.tagsArray.includes(tag)) {
      this.tagsArray.push(tag);

    }

    let games = [];
    this.videos.map(game => {
      if (this.isSubset(game.streamTags, this.tagsArray)) {
        games.push(game);
      }
    });

    this.videos = games;
    this.browseService.filterByTag(tag);
    this.router.navigate(['browse/recentVideos']);
  }
  isSubset(arr1, arr2) {
    for (var i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        return false;
      }
    }
    return true;
  }

  async  removeTag(tag) {
    //@ts-ignores
    const username = this.route.params.value.userName;
    const response: any = await this.browseService.getVideoList(username);
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

    this.videos = games;
  }

  openStreamDialogBox(streamInfo) {
    console.log('from the vedio component', streamInfo);
    let obj = {};
    obj['image'] = this.utils.getImageUrl(streamInfo.streamImage);
    obj['tags'] = streamInfo.streamTags;
    obj['title'] = streamInfo.streamTitle;
    obj['description'] = streamInfo.streamDescription;
    obj['streamId'] = streamInfo.id;
    obj['userName'] = streamInfo.username;
    obj['game'] = streamInfo.gameTitle;
    // obj['game'] = streamInfo.
    this.utils.getStreamInfoById(obj);
    this.utils.streamInfoDialog = true;
  }
  getFollower() {
     //@ts-ignores
   const username = this.route.params.value.userName;
   console.log("username",username);
    this.router.navigate(['/' + username + '/followers']);
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }
  getRoute() {
     //@ts-ignores
   const username = this.route.params.value.userName;
   console.log("username",username);
    this.router.navigate(['/'+username+ '/channel']);
  }
}
