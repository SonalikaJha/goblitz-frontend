import { BrowseService } from 'src/app/services/browse.service';
import { UserProfileService } from './../../services/user-profile.service';
import { AuthService } from './../../services/auth.service';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { StreamService } from '../../services/stream.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { UtilityService } from '../../services/utility.service';
import { Observable, Subscription } from 'rxjs';
import { interval } from 'rxjs';


@Component({
  selector: 'app-stream-page',
  templateUrl: './stream-page.component.html',
  styleUrls: ['./stream-page.component.scss']
})
export class StreamPageComponent implements OnInit, OnDestroy {
  follwersCount = ''
  messageSubscription: Subscription;
  againRender = false;
  liveCounts = 0;
  timer;
  isShowLoginComponent = false;
  authFormType: number;
  isAuthFormVisible: boolean;
  followStatus: boolean;
  filteredBroadcastList: any = [];
  recommendedBroadCastFilter: any = [];
  paramUserName = '';
  loginUserName = '';
  recent = [];
  thumbnailImg: any;
  userProfileData: any;
  recommended = [
    {
      link: '',
      image: 'assets/images/no-game-cover.jpg',
      userProfile: 'assets/images/no-profile-image.jpg',
      title: 'Title of the game!',
      userName: 'jhon',
      game: 'PUBG'
    }, {
      link: '',
      image: 'assets/images/no-game-cover.jpg',
      userProfile: 'assets/images/no-profile-image.jpg',
      title: 'Title of the game!',
      userName: 'jhon',
      game: 'PUBG'
    }, {
      link: '',
      image: 'assets/images/no-game-cover.jpg',
      userProfile: 'assets/images/no-profile-image.jpg',
      title: 'Title of the game!',
      userName: 'jhon',
      game: 'PUBG'
    }, {
      link: '',
      image: 'assets/images/no-game-cover.jpg',
      userProfile: 'assets/images/no-profile-image.jpg',
      title: 'Title of the game!',
      userName: 'jhon',
      game: 'PUBG'
    }, {
      link: '',
      image: 'assets/images/no-game-cover.jpg',
      userProfile: 'assets/images/no-profile-image.jpg',
      title: 'Title of the game!',
      userName: 'jhon',
      game: 'PUBG'
    }, {
      link: '',
      image: 'assets/images/no-game-cover.jpg',
      userProfile: 'assets/images/no-profile-image.jpg',
      title: 'Title of the game!',
      userName: 'jhon',
      game: 'PUBG'
    }, {
      link: '',
      image: 'assets/images/no-game-cover.jpg',
      userProfile: 'assets/images/no-profile-image.jpg',
      title: 'Title of the game!',
      userName: 'jhon',
      game: 'PUBG'
    }];

  streamKey: string;

  isSidebarVisible = true;

  streamer = {
    name: '',
    image: '',
    isLive: false,
    followers: '5M',
    views: '0',
    stream: {
      gameTitle: '',
      game: {
        title: '',
        image: ''
      },
      gameDescription: '',
      tags: [],
      isLive: false,
      totalLiveViews: 5000,
      startTime: undefined,
      streamOutputUrl: undefined,
      coverImage: undefined,
    }
  };


  isTheatreMode = false;

  liveStreamUrl: '';
  isLiveStreamUrlFetched = false;
  userName = '';
  streamInfoForm: FormGroup;
  private streamData: any;
  gameconfig = {
    displayKey: 'title',
    search: true
  };
  tagconfig = {
    displayKey: 'tag',
    search: true,
  };

  constructor(private route: ActivatedRoute,
    public streamService: StreamService,
    private formBuilder: FormBuilder,
    public utilityService: UtilityService,
    public authService: AuthService,
    public userProfileService: UserProfileService,
    private browseService: BrowseService,
    private router: Router,
    private changeDetection: ChangeDetectorRef
  ) {
  }

  async ngOnInit() {
    this.getfollowers();
    this.messageSubscription = this.streamService.getMessage().subscribe(message => {
      this.recommendedBroadCastFilter = [];
      this.filteredBroadcastList = [];
      console.log(this.changeDetection.detectChanges());
      this.browseService.getRecentBroadcasts(this.route.params['value'].userName).then(res => {
        if (res['data'].length != 0) {
          this.getRecentBroadcastListByUsername();
          this.recommendedBroadCastFilter = this.filteredBroadcastList.sort((x, y) => {
            return y.totalPlaybackViews - x.totalPlaybackViews;
          })
        }
      })
    })

    this.timer = interval(5000)
      .subscribe((val) => {
        this.getLiveCounts()
      });
    this.utilityService.streamInfoDialog = false;
    this.userProfileService.getUserProfile();

    this.streamInfoForm = this.formBuilder.group(
      {
        gameTitle: ['', Validators.required],
        goLiveInfo: ['', Validators.required],
        selectData: ['', Validators.required],
        tagData: [''],
        image: [''],

      });
    await this.getStreamInfo();
    // await this.getRecentPlaybacks();
    await this.utilityService.getgames();
    await this.utilityService.getTags();
    this.getfollowUnfollowStatus();

    this.browseService.getRecentBroadcasts(this.route.params['value'].userName).then(res => {
      console.log('recommended broadcast list > ', res)
      if (res['data'].length != 0) {
        this.getRecentBroadcastListByUsername();
        this.recommendedBroadCastFilter = this.filteredBroadcastList.sort((x, y) => {
          return y.totalPlaybackViews - x.totalPlaybackViews;
        })
      }
    })

    // @ts-ignore
    this.paramUserName = this.route.params.value.userName;

    this.authService.currentUser.subscribe(res => {
      // console.log('subscribe result', res)
      this.loginUserName = res.username;
      // console.log('param username', this.paramUserName);
    });
  }

  getLiveCounts() {
    if (this.streamer.stream['isLive']) {
      this.streamService.getLiveCounts(this.streamer.stream['user']._id)
    } else {
      this.streamService.liveCounts = 0;
    }

  }

  hideAuthForm() {
    this.authFormType = null;
    this.isAuthFormVisible = false;
  }

  showAuthForm(type = 0) {
    this.authFormType = type;
    this.isAuthFormVisible = true;
  }

  verifyUser(text) {
    const token = localStorage.getItem('user_data');
    if (token === null) {
      console.log('user not log in');
      this.utilityService.toastr.error('Only logged user can ' + text, null, { positionClass: 'toast-top-center' });
      return this.showAuthForm(0);
    } else {
      console.log('user logged in');
      this.isAuthFormVisible = false;
    }
  }

  getRecentBroadcastListByUsername() {
    this.filteredBroadcastList = this.browseService.recentBroadcastList.filter(x => {
      return x.playbackUrl != "";
    });
    // setTimeout(() => {
    //   console.log('filter wali',this.filteredBroadcastList);
    // }, 5000);

  }

  get isFullscreen(): boolean {
    return environment.isFullscreen;
  }

  getStreamer() {
    this.streamer.name = 'Saudagarrr';
    this.streamer.image = 'assets/images/no-profile-image.jpg';
    this.streamer.isLive = true;
    this.streamer.views = '105,120,947';
  }

  getStreamKey() {
    return this.route.paramMap.subscribe(paramMap => {
      this.streamKey = paramMap.get('streamkey');
      this.getStreamer();
    });
  }

  toggleSidebar() {
    return 'donothing';
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  toggleTheatre(isTheatreMode = false) {
    this.isTheatreMode = isTheatreMode;
  }

  private async getLiveStreamUrl() {
    const response = await this.streamService.getLiveStreamUrl(this.userName);
    // @ts-ignore
    this.liveStreamUrl = response.data.url;
    this.isLiveStreamUrlFetched = !this.isLiveStreamUrlFetched;
  }

  async updateStreamInfo(e) {
    // this.streamInfoForm.value.selectData = this.streamInfoForm.value.selectData['_id'];
    // console.log('hi', this.streamInfoForm.value);
    const val = await this.streamService.updateStreamInfo(this.streamInfoForm.value);
    if (val === 'ok') {
      this.getStreamInfo();
    }

  }

  private async getStreamInfo() {
    // @ts-ignore
    const userName = this.route.params.value.userName;
    const response: any = await this.streamService.getStreamInfo(userName);
    this.streamer.stream = response.data;
    if (this.streamer.stream.game == null) {
      this.streamer.stream.game = {
        title: '',
        image: ''
      }
    }
    console.log('stream data', this.streamer);
    if (!('isLive' in this.streamer.stream)) {
      this.utilityService.GlobalIsLive = false;
    } else {
      this.utilityService.GlobalIsLive = this.streamer.stream.isLive;
    }

    this.streamer.stream['user'].profileImage = this.utilityService.getImageUrl(this.streamer.stream['user'].profileImage);
  }

  calculateStartingTime() {
    return moment().diff(moment(this.streamer.stream.startTime), 'minutes');
  }

  copyShareLink() {
    this.utilityService.copyTextToClipboard(window.location.href);
  }

  openUpdateStreamInfoForm() {
    if (this.streamer.stream['isLive'] == true) {
      console.log('stream info', this.streamer);
      if (Object.keys(this.streamer.stream).length != 0) {
        this.streamInfoForm.setValue({
          gameTitle: this.streamer.stream.gameTitle,
          goLiveInfo: this.streamer.stream.gameDescription,
          selectData: [this.streamer.stream.game.title != '' ? this.streamer.stream.game : ''],
          tagData: [],
          image: ''
        });
        this.streamer.stream.tags.forEach(ele => {
          this.utilityService.tagList.forEach(element => {
            // console.log(element.tag === ele);
            if (element.tag === ele) {
              this.streamInfoForm.value.tagData.push(element);
            }
          });
        });
        this.thumbnailImg = this.utilityService.getImageUrl(this.streamer.stream.coverImage);
      }
    } else {
      this.utilityService.toastr.error('Available during live stream only.');
    }
  }

  selectionChanged(event: any) {

  }

  async getRecentPlaybacks() {
    // @ts-ignore
    const userName = this.route.params.value.userName;
    const response = await this.streamService.getRecentPlaybacks(userName);
    // @ts-ignore
    this.recent = response.data.result;
  }

  uploadImage() {
    document.getElementById('uploadImg').click();
  }

  changeThumbNailImg(evt) {
    this.streamInfoForm.value.image = evt.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(evt.target.files[0]);
    reader.onload = (event) => {
      this.thumbnailImg = reader.result;
    };
  }

  getImageUrl(url) {
    if (url === '') {
      return url;
    } else {
      return this.utilityService.getImageUrl(url);
    }
  }

  async followChannel() {
    console.log('called follow channel');
    // await this.verifyUser('follow');

    const user = localStorage.getItem('user_data');
    if (user) {
      this.browseService.followUserChannel(this.paramUserName).then(result => {
        // this.utilityService.toastr.success('You followed successfully!!');
        this.followStatus = false;
        this.getfollowers()
      }).catch(err => {
        this.utilityService.toastr.error(err);
      });
    } else {
      this.utilityService.toastr.error('Only logged user can follow', '', { positionClass: 'toast-top-center' });
      return this.showAuthForm(0);
    }

  }

  async unFollowChannel() {
    this.browseService.unfollowUserChannel(this.paramUserName)
      .then(result => {
        console.log(result);
        this.followStatus = true;
        this.getfollowers()
      })
      .catch(err => {
        console.log(err);
        this.utilityService.toastr.error(err);
      });
  }

  async getfollowUnfollowStatus() {
    // @ts-ignore
    const userName = this.route.params.value.userName;
    const user = localStorage.getItem('user_data');
    if (user) {
      const response: any = await this.browseService.getfollowUnfollowChannelStatus(userName);
      if (response.data === 'true') {
        this.followStatus = false;
      } else {
        this.followStatus = true;
      }
    } else {
      this.followStatus = true;
    }

  }

  ngOnDestroy() {
    this.timer.unsubscribe();
    this.messageSubscription.unsubscribe();
  }

  getFollower() {
    let user = localStorage.getItem('user_data');
    let userdata = JSON.parse(user);
    //@ts-ignores
    this.router.navigate(['/' + this.route.params.value.userName + '/followers']);
  }
  getvideos() {
    const user = localStorage.getItem('user_data');
    const userdata = JSON.parse(user);
    //@ts-ignores

    this.router.navigate(['/' + this.route.params.value.userName + '/videos']);
  }
  getProfile() {
    const user = localStorage.getItem('user_data');
    const userdata = JSON.parse(user);
    //@ts-ignores

    this.router.navigate(['/' + this.route.params.value.userName + '/profiles']);
  }

  getImageUrl1(url) {
    return this.utilityService.getImageUrl(url);
  }

  async getfollowers() {
    const res = await this.browseService.getFollowersList(this.route.params['value'].userName);
    console.log('follwer count ', res)
    this.follwersCount = res['message'];
  }

}
