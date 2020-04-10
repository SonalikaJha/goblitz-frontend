import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { UtilityService } from './utility.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private subject = new Subject<any>();
  routes = {
    getUserProfile: 'user-profile',
    editUserProfile: 'update-user-profile',
    editProfileImage: 'update-profile-image',
    editCoverImage: 'update-cover-image',
    deactivateAccount: 'deactivate-account'
  };

  constructor(private http: HttpService,
    private UtilityService: UtilityService
      
    ) { }
  async getUserProfile() {
    const response = await this.http.get(this.routes.getUserProfile, true, {});
    // console.log('response', response);
    this.sendUpdatedProfileData(response['data'])
    return response;

    
  }


  sendUpdatedProfileData(message: any) {
      this.subject.next({ text: message });
  }

  getupdateProfileData(): Observable<any> {
    return this.subject.asObservable();
}

  async editUserProfile(formData) {
    const response = await this.http.post(this.routes.editUserProfile, formData, true, {});
    // console.log('response', response);
    if(response['message'] == 'user profile updated') {
      this.UtilityService.toastr.success('Profile Updated Sucessfully')
    }
    return response;
    // localStorage.clear();
  }

  async editCoverImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await this.http.post(this.routes.editCoverImage, formData);
    // console.log('response', response);
    return response;
  }

  async editProfileImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await this.http.post(this.routes.editProfileImage, formData, true, {});
    // console.log('response', response);
    return response;
  }

  async disableAccount(requset: any) {
    console.log(requset);
    const response = await this.http.post(this.routes.deactivateAccount, requset,true,{});
    // console.log('response', response);
    return response;
  }
}
