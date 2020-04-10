import { UserProfileService } from './../../services/user-profile.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/user';
import {UtilityService} from '../../services/utility.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userProfileData: any;
  isMenuHidden = true;
  isOnline = true;
  isAuthFormVisible = false;
  authFormType: number;
  searchText: string;
  constructor(private authService: AuthService, public utils: UtilityService, private router: Router,
              public userProfileService: UserProfileService
    ) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     }

  get isAuthenticated(): User {
    return this.user;
  }

  get user(): User {
    return this.authService.user;
  }

  get isFullscreen(): boolean {
    return environment.isFullscreen;
  }

  ngOnInit() {
    this.userProfileService.getUserProfile();
    this.userProfileService.getupdateProfileData().subscribe(res => {
      let copyData = {};
      copyData = Object.assign({}, res['text']);
      this.userProfileData = copyData;
      // console.log('copyData',copyData)
      this.userProfileData.profileImage = this.utils.getImageUrl(this.userProfileData.profileImage);
    });
  }

  toggleUserMenu() {
    this.isMenuHidden = !this.isMenuHidden;
  }

  toggleStatus() {
    this.isOnline = !this.isOnline;
  }

  logout() {
    this.router.navigate(['/']).then(r => {
      this.authService.logout();
      this.authService.isLoggedIn();
      this.utils.toastr.success('Logged out successfully');
      this.isMenuHidden = true;
    });
  }

  showAuthForm(type = 0) {
    this.authFormType = type;
    this.isAuthFormVisible = true;
  }

  hideAuthForm() {
    this.authFormType = null;
    this.isAuthFormVisible = false;
  }

  async searchList() {
    // let response = await this.streamService.search(this.searchText);
    // console.log('search text', this.searchText);
    const url = 'search/' + this.searchText;
    this.router.navigated = false;
    this.router.navigate(['search/' + this.searchText]);


    // this.router.navigateByUrl('search/'+this.searchText).then(() =>
    // this.router.navigate([url]));

    // console.log('navbar redirected');
    // tslint:disable-next-line:only-arrow-functions
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
    this.searchText = '';
  }

  onCategory(){
    this.router.navigate(['browse/categories']);
  }
}
