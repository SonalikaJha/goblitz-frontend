import { UtilityService } from './utility.service';
import { Injectable, ɵConsole } from '@angular/core';
import { HttpService } from './http.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  messageSubject = new Subject<any>();
  liveCounts = 0;
  routes = {
    getOBSSettings: 'get-obs-settings',
    liveStream: 'live-user-stream/',
    recentPlaybacks: 'recent-playbacks/',
    getStreamInfo: 'get-stream-info/',
    updateStreamInfo: 'update-stream-info',
    latestStream: 'latest-stream',
    search: 'search',
    getPlaybackUrl: 'playback-url/',
    updateStreamInfoByStreamId: 'update-stream-info',
    liveCounts: 'watching-now',
    deleteStream: 'delete-stream'
  };
  liveStreamUrl: any;

  constructor(private http: HttpService,
    private utilityService: UtilityService
  ) { }

  async getOBSSettings() {
    const response = await this.http.get(this.routes.getOBSSettings, true, {});
    // console.log('response', response);
    return response;
  }

  async getLiveStreamUrl(userName) {
    const response = await this.http.get(this.routes.liveStream + userName, true, {});
    // console.log('response', response);
    return response;
  }

  async getRecentPlaybacks(userName) {
    const response = await this.http.get(this.routes.recentPlaybacks + userName, true, {});
    // console.log('response', response);
    return response;
  }
  async getStreamInfo(userName) {
    const response = await this.http.get(this.routes.getStreamInfo + userName);
    // console.log('getStreamInfo', response);
    return response;
  }

  async updateStreamInfo(data) {
    console.log('front end data', data);
    let arr = [...new Set(data.tagData)];
    const tagArray = [];
    arr.forEach(element => {
      tagArray.push(element['_id']);
    });
    let selData = '';
    if (data.selectData == undefined) {
      selData = ''
    } else {
      this.utilityService.gameList.forEach(element => {
        if (element.title === data.selectData.title) {
          selData = element._id;
        }
      });
    }

    // console.log('sel data', selData);
    const formData = new FormData();
    // console.log('send data', data);
    formData.append('gameTitle', data.gameTitle);
    formData.append('gameDescription', data.goLiveInfo);
    if (data.image !== '') {
      formData.append('image', data.image[0]);

    }
    formData.append('gameId', selData);
    formData.append('tags', JSON.stringify(tagArray));
    // console.log('formData', formData);
    const response: any = await this.http.put(this.routes.updateStreamInfo, formData, true, {});
    if (response.message === 'ok') {
      this.utilityService.toastr.success('Updated Successfully!!!!');
      return 'ok';
    }
    // console.log(response);
  }

  async getLatestStream() {
    const response = await this.http.get(this.routes.latestStream);
    // console.log('response', response);
    return response;
  }
  async search(searchText) {

    const data = new FormData();
    data.append('searchText', searchText);
    // console.log('service text', searchText);
    const response = await this.http.post(this.routes.search, data, true);
    // console.log('search Data', response);
    return response;
  }
  async getPlaybackUrl(videoId) {

    const response = await this.http.get(this.routes.getPlaybackUrl + videoId, true, {});
    // console.log('response', response);
    // @ts-ignore
    return response.data.url;
  }

  async updateParticularStreamInfo(data) {
    this.utilityService.streamInfoDialog = false;
    let arr = [...new Set(data.tagData)];
    const tagArray = [];
    arr.forEach(element => {
      tagArray.push(element['_id']);
    });
    let selData = '';
    if (data.selectData == undefined) {
      selData = ''
    } else {
      this.utilityService.gameList.forEach(element => {
        if (element.title === data.selectData.title) {
          selData = element._id;
        }
      });
    }

    // console.log('sel data', selData);
    const formData = new FormData();
    // console.log('send data', data);
    formData.append('gameTitle', data.gameTitle);
    formData.append('gameDescription', data.goLiveInfo);
    if (data.image !== '') {
      formData.append('image', data.image[0]);

    }
    formData.append('gameId', selData);
    formData.append('tags', JSON.stringify(tagArray));


    let id = data.streamId;
    const response = await this.http.put(this.routes.updateStreamInfoByStreamId + '/' + id, formData, true)
    if (response['message'] === 'ok') {
      this.utilityService.toastr.success('Updated Successfully!!!!');
      this.sendMessage('updated');
      return 'ok';
    }
  }

  sendMessage(message: string) {
    this.messageSubject.next({ text: message });
  }

  getMessage(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  async getLiveCounts(userId) {
    const res = await this.http.get(this.routes.liveCounts + '/' + userId, true, {})
    this.liveCounts = res['data'];
    console.log(this.liveCounts);
  }

  async deleteStream(id) {
    const res = await this.http.get(this.routes.deleteStream + '/' + id, true, {})
    if (res['message'] == 'removed') {
      this.utilityService.toastr.success('Deleted Successfully');
      this.sendMessage('deleted');
    }
  }
}
