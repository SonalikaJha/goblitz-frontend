import { Component, OnInit } from '@angular/core';
import { BrowseService } from 'src/app/services/browse.service';
import { UtilityService } from 'src/app/services/utility.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.scss']
})
export class FollowerComponent implements OnInit {
  followers = [];
  followerss=[];
  paramUserName = '';
  // authFormType: number;
  // isAuthFormVisible: boolean;
  // followStatus: boolean;

  constructor(private browseService: BrowseService,
              private utilityService: UtilityService,
              private route: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit() {
    this.followerName();
    this.follower();
    const token = JSON.parse(localStorage.getItem('user_data'));
    if (token !== null) {
      this.paramUserName = token['username']
    }
    //this.getfollowUnfollowStatus();
  }
  async follower() {
    //@ts-ignores
    const username = this.route.params.value.username;
    console.log("username",username);
    const response: any = await this.browseService.getFollowersList(username);
    this.followers = response.data;
    console.log('followers', this.followers);
  }
  getImageUrl(url) {
    return this.utilityService.getImageUrl(url);

  }

  // hideAuthForm() {
  //   this.authFormType = null;
  //   this.isAuthFormVisible = false;
  // }

  // showAuthForm(type = 0) {
  //   this.authFormType = type;
  //   this.isAuthFormVisible = true;
  // }

  // verifyUser(text) {
  //   const token = localStorage.getItem('user_data');
  //   if (token === null) {
  //     // this.utilityService.toastr.error('Only logged user can ' + text, null, {positionClass: 'toast-top-center'});
  //     return this.showAuthForm(0);
  //   } else {
  //     this.isAuthFormVisible = false;
  //   }

  // }

  // async followChannel(username: string) {
  //   console.log('called follow channel');
  //   // await this.verifyUser('follow');

  //   const user = localStorage.getItem('user_data');
  //   if (user) {
  //     this.browseService.followUserChannel(username).then(result => {
  //       // this.utilityService.toastr.success('You followed successfully!!');
  //       this.followStatus = false;
  //     }).catch(err => {
  //       this.utilityService.toastr.error(err);
  //     });
  //   } else {
  //     this.utilityService.toastr.error('Only logged user can follow', '', {positionClass: 'toast-top-center'});
  //     return this.showAuthForm(0);
  //   }

  // }

  // async unFollowChannel(username: string) {
  //   this.browseService.unfollowUserChannel(username)
  //     .then( result => {
  //       console.log(result);
  //       this.followStatus = true;
  //     })
  //     .catch( err => {
  //       console.log(err);
  //       this.utilityService.toastr.error(err);
  //     });
  // }

  //  getfollowUnfollowStatus(username) {
  //   // @ts-ignore
  //   const userName =  this.route.params.value.username;
  //   console.log("userName", userName );
  //   const user = localStorage.getItem('user_data');
  //   if (user) {
  //     const response: any =  this.browseService.getfollowUnfollowChannelStatus(username);
  //     if (response.data === 'true') {
  //       return false;
  //       // this.followStatus = false;
  //     } else {
  //       // this.followStatus = true;
  //       return true;
  //     }
  //   } else {
  //     // this.followStatus = true;
  //     return true;
  //   }

  // }
 followerName(){
   //@ts-ignores
  const username = this.route.params.value.username;
  this.followerss= username;
  
 }
 getvideos() {
  
  //@ts-ignores
  const username = this.route.params.value.username;
  console.log("username",username);
  this.router.navigate(['/' + username + '/videos']);
  
}
getRoute() {
   //@ts-ignores
   const username = this.route.params.value.username;
   console.log("username",username);
  this.router.navigate(['/'+username+ '/channel']);
}
}
