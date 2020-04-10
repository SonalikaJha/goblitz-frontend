import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  GlobalIsLive = false;
  currentStreamInfo: any;
  streamInfoDialog = false;
  recommendedChannelData = [1,2,3,4,5];
  gameList: any;
  tagList: any;

  channelData = {
    link: '',
    image: 'assets/images/no-cover-image.jpg',
    userProfile: 'assets/images/no-profile-image.jpg',
    title: 'Title of the game!',
    userName: 'Arit',
    game: 'PUBG',
    views: '78K'
  }

  routes = {
    getImagePreview : 'update-user-image',
    getCoverImagePreview: 'update-user-cover',
    getGameImagePreview:'game',
    getRecommendedList: 'recommended-channels',
    getPopularChannelsList: 'getPopularChannels',
    getGames: 'game',
    gettags: 'tag',
    allChannelsList: 'v1/all-channels',

  };

  constructor(public toastr: ToastrService,
    private http: HttpService
    ) { }

  pad(num: number, padding: number) {
    try {
      const stringPadding = '0'.repeat(padding);
      return (stringPadding + num.toString()).substr(-padding);
    } catch (e) {
      if (typeof padding === 'number') {
        return '00';
      } else {
        return '0'.repeat(padding);
      }
    }
  }

  makeDate(day = 0, month = 0, year = 1900) {
    return this.pad(year, 4) + '-' + this.pad(month, 2) + '-' + this.pad(day, 2);
  }

  handle422Error(err: HttpErrorResponse, formGroup: FormGroup) {
    Object.keys(err.error.errors).forEach(prop => {
      const formControl = formGroup.get(prop);
      if (formControl) {
        formControl.setErrors({
          backend: err.error.errors[prop]
        });
      }
    });

  }
  async getImagePreview(event) {
    return new Promise((resolve, reject) => {
      const input = event.target;
      if (input.files && input.files[0]) {
        let image = {
          file: Object
        };
        image.file = input.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          //@ts-ignore
          image.base64String = event.target.result;
          resolve(image);
        };
        reader.onerror = reject;
        reader.readAsDataURL(input.files[0]);
      }
    });
  }
  async getCoverImagePreview(event) {
    return new Promise((resolve, reject) => {
      const input = event.target;
      if (input.files && input.files[0]) {
        let coverimage = {
          file: Object
        };
        coverimage.file = input.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          //@ts-ignore
          coverimage.base64String = event.target.result;
          resolve(coverimage);
        };
        reader.onerror = reject;
        reader.readAsDataURL(input.files[0]);
      }
    });
  }
  async getGameImagePreview(event) {
    return new Promise((resolve, reject) => {
      const input = event.target;
      if (input.file && input.files[0]) {
        let gameimage = {
          file: Object
        };
        gameimage.file = input.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          //@ts-ignore
          gameimage.base64String = event.target.result;
          resolve(gameimage);
        };
        reader.onerror = reject;
        reader.readAsDataURL(input.files[0]);
      }
    });
  }


  getImageUrl(url) {
    return environment.baseUrl + url;
  }
  getprofileImageUrl(url) {
    return environment.baseUrl + url;
  }

  copyTextToClipboard(text) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  async getRecommendedChannelList() {
    const res = await this.http.get(this.routes.allChannelsList);
    return res;
    console.log("res", res);
  }

  async getPopularChannels() {
    // const res = await this.http.get(this.routes.getPopularChannelsList);
    return 'neeraj';
  }

  async getgames() {
    const res = await this.http.get(this.routes.getGames);
    this.gameList = res['data'];
    // console.log(this.gameList);
  }

  async getTags() {
    const res = await this.http.get(this.routes.gettags);
    this.tagList = res['data'];
    // console.log(this.tagList);
  }

  getPlaybackIdFromLink(link) {
    try {
      let res = link.split('/');
      res = res.slice(-1).pop();
      res = res.split('.');
      return res[0];
    } catch (e) {
      return  '';
    }
  }

  getStreamInfoById(data) {
     this.currentStreamInfo = data
  }

  async returnStreamInfo() {
    return  this.currentStreamInfo;
  }

}
