
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { EventEmitter } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class BrowseService {
  
  //$filterTags = new EventEmitter();
  recentBroadcastList: any;
  routes = {
    getCategorylListUrl: 'game',
    getLiveChannelUrl: 'v1/live-channels',
    getPopularListUrl: 'get-popularList',
    getAllChannelPageUrl: 'v1/all-channels',
    getAllTagsUrl: 'tag',
    getGameByIdUrl: 'game-title',

    getFollowersUrl: 'channel-follower/',
    getVideoUrl: 'v1/channel-videos/',
    following: 'channel-following',
    viewsCount: 'count-viewers',
    playBackVideos: 'v1/recent-broadcasts',
    getRecentBroadcastList: 'v1/recent-broadcasts',
    getRecommendedBroadcast: 'v1/channel-videos',


    followChannel: 'follower-count',
    followStatus: 'follower-status',
    tagData: 'tag',
    inactiveTag: 'inactive-tag',
    doSingleTagActive: 'active-singletag',
    activeTag: 'active-tag',
    getAllInactiveTagsUrl:'inactiveTag-list',
    getAllactiveTagsUrl: 'activeTag-list',
    unfollowChannel: 'unfollower-count',
    getRecentVideo:'v1/all-recent-videos',


    followUserChannel: 'channel-follow/',
    unfollowUserChannel: 'channel-unfollow/',
    isfollowUserChannel: 'channel-status/',
    activateAccountUrl: 'activate-account',
    resetPassword: 'update-password'
  };
  sharedTag = '';
  filteredTag = [];

  constructor(private http: HttpService) {
  }


  async getCategorylList() {
    const response = await this.http.get(this.routes.getCategorylListUrl, true, {});
    return response;
  }

  async getLiveChannelList() {
    const response = await this.http.get(this.routes.getLiveChannelUrl, true, {});
    return response;
  }

  async getPopularList() {
    const response = await this.http.get(this.routes.getPopularListUrl, true, {});
    return response;
  }

  async getAllChannelPageList() {
    const response = await this.http.get(this.routes.getAllChannelPageUrl, true, {});
    return response;
  }

  async getAllTagsList() {
    const response = await this.http.get(this.routes.getAllTagsUrl, true, {});
    return response;
  }
  async getAllInactiveTagsList() {
    const response = await this.http.get(this.routes.getAllInactiveTagsUrl, true, {});
    return response;
  }
  async getAllactiveTagsList() {
    const response = await this.http.get(this.routes.getAllactiveTagsUrl, true, {});
    return response;
  }
  async getGameData(gameTitle: any) {
    const data = new FormData();
    data.append('title', gameTitle);
    const response = await this.http.post(this.routes.getGameByIdUrl, data, true, {});
    return response;
  }

  async getRecentPlayBacks() {
    const response = await this.http.get(this.routes.playBackVideos, true, {});
    return response;
  }
  async getRecentVideo() {
    const response = await this.http.get(this.routes.getRecentVideo, true, {});
    return response;
  }

  async followUpChannel(game: any) {
    const response = await this.http.post(this.routes.followChannel, game, true, {});
    return response;
  }

  async viewsCount() {
    const response = await this.http.get(this.routes.viewsCount, true, {});
    return response;
  }
  async following() {
    const response = await this.http.get(this.routes.following, true, {});
    return response;
  }
  async getRecentBroadcasts(username) {
    const response = await this.http.get(this.routes.getRecommendedBroadcast + '/' + username);
    this.recentBroadcastList = response['data'];
    return response;
  }
  async getFollowersList(username) {
    const response = await this.http.get(this.routes.getFollowersUrl + username, true, {});
    return response;
  }
  async getVideoList(username) {
    const response = await this.http.get(this.routes.getVideoUrl + username, true, {});
    return response;
  }

  async unfollowChannel(game: any) {
    const response = await this.http.post(this.routes.unfollowChannel, game, true, {});
    return response;
  }

  async getfollowStatus(game: any) {
    const response = await this.http.post(this.routes.followStatus, game, true, {});
    return response;
  }
  async createTagData(tagarray){
    console.log('tagarray', tagarray);
    const response = await this.http.post(this.routes.tagData,tagarray, true, {});
      return response;
  
  }
  async createInactiveTag(inactiveTags){
    console.log('createInactiveTag', );
    const response = await this.http.post(this.routes.inactiveTag, inactiveTags, true, {});
      return response;
  
  }async doTagActive(activeTag){
    console.log('createInactiveTag', );
    const response = await this.http.post(this.routes.doSingleTagActive, activeTag, true, {});
      return response;
  
  }
  async createActiveTag(activeTags){
    console.log('createInactiveTag', );
    const response = await this.http.post(this.routes.activeTag, activeTags, true, {});
      return response;
  
  }

  channelStatus(status) {
    this.channelStatus = status;
  }

  getChannelStatus() {
    return this.channelStatus;
  }
  async filterByTag(tag) {
    this.sharedTag = tag;
  }

  getTagValue() {
    return this.sharedTag;
  }
  async filterTagValue(tag) {
    console.log('filter tag value =>>>>>.',tag)
    if (!this.filteredTag.includes(tag)) {
      this.filteredTag.push(tag);
    }

  }
  getFilterTagValue() {
    return this.filteredTag;
  }

  removeTagInsearch(tag) {
    let arr = [];
    this.filteredTag.forEach(s => {
      if (s !== tag) {
        arr.push(s);
      }
    });
    this.filteredTag = arr;

    // async filterByTag(tag){
    //  this.sharedTag=tag;
    // }

    // getTagValue(){
    //   return this.sharedTag;
    // }
  }
  async followUserChannel(paramUserName: string) {
    const response = await this.http.get(this.routes.followUserChannel + paramUserName, true, {});
    console.log('response', response);
    return response;
  }

  async unfollowUserChannel(paramUserName: string) {
    const response = await this.http.get(this.routes.unfollowUserChannel + paramUserName, true, {});
    console.log('response', response);
    return response;
  }

  async getfollowUnfollowChannelStatus(paramUserName: string) {
    console.log('user name', paramUserName);
    const response = await this.http.get(this.routes.isfollowUserChannel + paramUserName, true, {});
    console.log('response', response);
    return response;
  }

  async activateAccount(token: string) {
    const response = await this.http.post(this.routes.activateAccountUrl, {"token":token}, true, {});
    return response;
  }

  async resetPassword(data) {
    console.log("data",data);
    const response = await this.http.post(this.routes.resetPassword,data, true, {});
    return response;
  }

}
