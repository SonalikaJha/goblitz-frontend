import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  routes = {
    getAll : 'tag',
    create:'tag'
    // editGameImage:'game'
      // editGameImage: 'game'
  };

  constructor(private http: HttpService) {}
   async getAll() {
    const response = await this.http.get(this.routes.getAll, true, {});
    // console.log('response', response);
    return response;
  }
  async create(formData) {
    const response = await this.http.post(this.routes.create, formData, true, {});
    // console.log('response', response);
    return response;
  }
}
