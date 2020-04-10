import { Component, OnInit } from '@angular/core';
import { BrowseService } from 'src/app/services/browse.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
  follwoing=[];
  followerss=[];

  constructor(
    private browseService: BrowseService,
              private utilityService: UtilityService,
              private route: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit() {
    this. getFollowing();
    this.followerName();
  }

  async getFollowing() {

    const response: any = await this.browseService.following();
    this.follwoing = response.data;
    console.log('follwoing', this.follwoing);
    }
    getImageUrl(url) {
    return this.utilityService.getImageUrl(url);
    
    }
    followerName(){
      //@ts-ignores
     const username = this.route.params.value.username;
     this.followerss= username;
     
    }
}
