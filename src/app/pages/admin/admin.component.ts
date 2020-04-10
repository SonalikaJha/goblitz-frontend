import {Component, OnInit} from '@angular/core';
import {UtilityService} from '../../services/utility.service';
import {AdminService} from '../../services/admin.service';
import {FormControl} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {FormBuilder, FormGroup, Validators, FormArray, ValidationErrors} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from "../../services/http.service";
import { BrowseService } from 'src/app/services/browse.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
tags=[];
  game: any = {
    title: '',
    description: '',
    image: '',
    coverImage: '',
     tags: [],
    followersCount: 0,
    viewersCount: 0,
    status: true
  };
  gameImage: File;
  gameCoverImage: File;
  gameInfoForm: FormGroup;

  file: {};
  title: '';
  image: any;
  coverImage: any;
  data: {
    title: '',
    description: '',
    image:''
    coverImage:'',
    tags:[],
    status:true,
  };
  tagconfig = {
    displayKey: 'tag',
    search: true,
    
  };
  allactiveTag=[];
  constructor(
                private http: HttpService,
                private adminService: AdminService,
                private utilityService: UtilityService,
                private browseService: BrowseService,
                private formBuilder: FormBuilder) {
  }

  async ngOnInit() {
    this.getAll();
    this.getactiveTagList();
    this.gameInfoForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        description: [''],
        image: ['', Validators.required],
        coverImage: ['',],
          tags:[[]],
        status:[true]
      });
     
  }

  async getAll() {
    const response: any = await this.adminService.getAll();
    this.game = response.data;
    // console.log('this.game', this.game);
     this.reinitialiseDataTable();
  }
  async getactiveTagList() {
    const response: any = await this.browseService.getAllactiveTagsList();
    this.allactiveTag = response.data;
  }

  async create() {
    let game= this.gameInfoForm.value;

    let tagIds=[];

    game.tags.forEach(element => {
     tagIds.push( element._id) ;
    
    });
    game.tags=tagIds;

    console.log('game', game);
    console.log('gameInfoForm', this.gameInfoForm.value);
    const formData = new FormData();
    for ( let x in this.gameInfoForm.value) {
      if (x === 'image') {
        formData.append('image', this.gameImage);
      } else if (x === 'coverImage') {
        formData.append('coverImage', this.gameCoverImage);
      } else {
        formData.append(x, game[x]);
      }
      
    }
    console.log('formData', game)
    const response: any = await this.adminService.create(formData);
    // console.log('response', response);
  }

  async getImagePreview(event) {
    const response: any = await this.utilityService.getImagePreview(event);
    // console.log('response', response);
    this.game.image = response.base64String;
    this.gameImage = response.file
  }

  async getCoverImagePreview(event){
    const response: any = await this.utilityService.getCoverImagePreview(event);
    // console.log('response', response);
    this.game.coverImage = response.base64String;
    this.gameCoverImage = response.file
  }

  getImageUrl(url) {
    if (url === '') {
      return url
    } else if (url !== '' && url.includes('data:image/')) {
      return url
    } else {
      return this.utilityService.getImageUrl(url);
    }
  }

  reinitialiseDataTable() {

    // @ts-ignore
    window.destroyDataTable('dataTable');
    setTimeout(() => {
      // @ts-ignore
      window.InitialiseDataTable('dataTable', {
        aaSorting: []
      });
    }, 500);
  }

  
}
