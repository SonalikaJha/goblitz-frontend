import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  profiles=[];
 
  constructor(private userProfileService: UserProfileService,
    private utilityService: UtilityService,
    private route: ActivatedRoute
) { }

ngOnInit() {
this.getProfile();


}
async getProfile() {

const response: any = await this.userProfileService.getUserProfile();
this.profiles = response;
console.log('profile', this.profiles);
}
getImageUrl(url) {
return this.utilityService.getImageUrl(url);

}

// followerName(){
// //@ts-ignores
// const username = this.route.params.value.username;
// this.followerss= username;

// }

}
