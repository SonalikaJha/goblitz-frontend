import { UtilityService } from 'src/app/services/utility.service';
import { UserProfileService } from './../../services/user-profile.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { BrowseService } from 'src/app/services/browse.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userProfileData: any;
  userIsOnline = true;
  followers = [];
  followerArray = [];

  constructor(private authService: AuthService,
              public userProfileService: UserProfileService,
              public utilityService: UtilityService,
              private browseService: BrowseService,
              private router: Router
    ) { }

  ngOnInit() {

    this.userProfileService.getUserProfile();
    this.userProfileService.getupdateProfileData().subscribe(res => {
      let copyData = {};
      copyData = Object.assign({}, res.text);
      this.userProfileData = copyData;
      console.log('copyData', copyData);
      this.userProfileData.profileImage = this.utilityService.getImageUrl(this.userProfileData.profileImage);
    });
  }

  get user() {
    return this.authService.user;
  }

  get isOnline() {
    // TODO: get online status from user data
    return this.userIsOnline;
  }

  // async follower() {
  //   const response: any = await this.browseService.getFollowersList();
  //   this.followers = response.data;
  //   console.log('followers', this.followers);
  // }

  getvideos() {
    const user = localStorage.getItem('user_data');
    const userdata = JSON.parse(user);
    this.router.navigate(['/' + userdata.username + '/videos']);
  }

  getFollower() {
    const user = localStorage.getItem('user_data');
    const userdata = JSON.parse(user);
    this.router.navigate(['/' + userdata.username + '/followers']);
  }
  getProfile(){
    const user = localStorage.getItem('user_data');
    const userdata = JSON.parse(user);
    this.router.navigate(['/' + userdata.username + '/profiles']);
  }
}
