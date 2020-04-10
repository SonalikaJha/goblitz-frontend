import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  routes = {
    getAll : 'game',
    create:'game',
    editGameImage:'game'
      // editGameImage: 'game'
  };

  constructor(private http: HttpService ) { }
  async getAll() {
    const response = await this.http.get(this.routes.getAll, true, {});
    console.log('response', response);
    return response;
  }
  // async getAll (file) {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   const response = await this.http.post(this.routes.getAll, formData, true, {});
  //   console.log('response', response);
  //   return response;
  // }
  async editGameImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await this.http.post(this.routes.editGameImage, formData);
    // console.log('response', response);
    return response;
  }
  async create(formData) {
    const response = await this.http.post(this.routes.create, formData, true, {});
    // console.log('response', response);
    return response;
  }
}
