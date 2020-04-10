import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import User from '../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  userData: any;
  routes = {
    login: 'login',
    register: 'register',
    forgetRequest: 'forget-password'
  };

  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user_data')));
    this.currentUser = this.currentUserSubject.asObservable();
    console.log('current user',this.currentUser);
  }

  get user(): User {
    return this.currentUserSubject.value;
  }

  public login(credentials: any, headers = {}) {
    const request = this.http.post(this.routes.login, credentials, true, headers);
    request.then((data: any) => {
      const user = data.data;
      if (user && user.token) {
        localStorage.setItem('user_data', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
    }).catch(_ => {});
    return request;
  }

  public register(userData: any) {
    return this.http.post(this.routes.register, userData);
  }

  sendRequest(requset: any, headers = {}) {
    return this.http.post(this.routes.forgetRequest,requset,false,{});
  }

  isLoggedIn() {
    const token = localStorage.getItem('user_data');
    if (token === null) {
      console.log('token is  nulllllll')
      return false;
    } else {
      console.log('token is not nulllllll')
      return true;
    }
  }

  public logout() {
    localStorage.removeItem('user_data');
    this.currentUserSubject.next(null);
  }

  public getLocalStorageData() {
    this.userData = JSON.parse(localStorage.getItem('user_data'));
    console.log('this.userData',this.userData);
  }

}
