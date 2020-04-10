import { Component, OnInit } from '@angular/core';
import { BrowseService } from 'src/app/services/browse.service';
import { UtilityService } from 'src/app/services/utility.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'underscore';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
  category: any;
  data = [];
  tagsArray = [];
  tagSerch = [];
  visible = false;
  alltag=[];
  searchText = '';

  constructor(private browseService: BrowseService,
    private utils: UtilityService,
    private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getCategorylList('');
    this.getTagList();
  }

  async getCategorylList(event) {
    const response: any = await this.browseService.getCategorylList();
    this.category = response.data;


    // @ts-ignore
    //const searchText = await this.route.params.value.text;
    
    console.log("this.searchText",this.searchText );
    if(this.searchText!==''){
      const filterData = [];
      this.category.map(ch => {

        if (ch.title.toLowerCase().includes(this.searchText.toLowerCase()) || ch.description.toLowerCase().includes(this.searchText.toLowerCase()) ) {
          filterData.push(ch);
        } else {
          ch.tags.forEach(t => {
            if (t.toLowerCase().includes(this.searchText.toLowerCase())) {
              filterData.push(ch);
            }
          });
        }
      });
      this.category = filterData;
      // this.searchText='';
     
    }




    //this.addTag(this.browseService.getTagValue());
    this.searchTagFilter(this.browseService.getFilterTagValue());
    this.addTag(this.browseService.getTagValue());
  }

  getImageUrl(url) {
    return this.utils.getImageUrl(url);

  }

  getRoute(game) {
    this.router.navigate(['/game/' + game._id]);
  }

  addTags(tag) {
    this.tagSerch.push(tag);
    this.browseService.filterTagValue(tag);
   
    
  }

  async getTagList() {
    const response: any = await this.browseService.getAllTagsList();
    this.alltag = response.data;
  }

  addTag(tag) {
    if(tag != ''){
      if (!this.tagsArray.includes(tag)) {
        this.tagsArray.push(tag);
        this.browseService.filterTagValue(tag);
      }
    }

    let games = [];
    this.category.map(game => {
      if (this.isSubset(game.tags, this.tagsArray)) {
        games.push(game);
      }
    });

    this.category = games;

  }
  searchTagFilter(tag) {
    if (tag.length > 0 && tag != '') {
      tag.forEach(element => {
        this.tagsArray.push(element);
      
      });
    }

    
    let games = [];
    this.category.map(game => {
      if (this.isSubset(game.tags, this.tagsArray)) {
        games.push(game);
      }
    });

    this.category = games;

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

    this.browseService.removeTagInsearch(tag);
    const response: any = await this.browseService.getCategorylList();
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
      if (this.isSubset(game.tags, this.tagsArray)) {

        await games.push(game);

      }
    });

    this.category = games;

  }

  gotoGame(game){
    let title=game.title;
    let first="";
    if(title.includes(" ")){
      let arr=title.split(" ");
      first=arr[0];
      for(let i=1;i<arr.length;i++){
        first=first+'-'+arr[i];
      } 
    }else {
        first=title;
    }
      console.log(first);
      //this.router.naviagte(['/game'])
     // return "/game/"+first;

      this.router.navigate(['/game/' +first]);
    
  }

}
