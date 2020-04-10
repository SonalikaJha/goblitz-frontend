import {ToastrService} from 'ngx-toastr';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  private static setHttpHeaders(headers: object) {
    let temp = new HttpHeaders();
    for (const key in headers) {
      if (headers.hasOwnProperty(key)) {
        temp = temp.append(key, headers[key]);
      }
    }
    return temp;
  }

  private static addAuthenticationHeader(httpHeaders: HttpHeaders) {
    let user = localStorage.getItem('user_data');
    if (user) {
      user = JSON.parse(user);
      // @ts-ignore
      return httpHeaders.append('Authorization', 'Bearer ' + user.token);
    } else {
      return httpHeaders;
    }
  }

  private static logOut() {
    localStorage.removeItem('user_data');
    window.location.reload();
  }

  public post(url: string, data: any, authorization = true, headers: object = {}) {
    let httpHeaders = HttpService.setHttpHeaders(headers);
    if (authorization) {
      httpHeaders = HttpService.addAuthenticationHeader(httpHeaders);
    }
    const request = this.http.post(environment.apiUrl + url, data, {headers: httpHeaders}).toPromise();
    request.then(response => {

    }).catch((err: HttpErrorResponse) => {
      if (err.status === 401) {
        HttpService.logOut();
      }
      // console.log('err.error', err);
      if ('message' in err.error) {
        this.toastr.error(err.error.message);
      } else {
        this.toastr.error(err.statusText);
      }
    });
    return request;
  }

  public put(url: string, data: any, authorization = true, headers: object = {}) {
    let httpHeaders = HttpService.setHttpHeaders(headers);
    if (authorization) {
      httpHeaders = HttpService.addAuthenticationHeader(httpHeaders);
    }
    const request = this.http.put(environment.apiUrl + url, data, {headers: httpHeaders}).toPromise();
    request.then(response => {

    }).catch((err: HttpErrorResponse) => {
      if (err.status === 401) {
        HttpService.logOut();
      }
      // console.log('err.error', err);
      if ('message' in err.error) {
        this.toastr.error(err.error.message);
      } else {
        this.toastr.error(err.statusText);
      }
    });
    return request;
  }

  public get(url: string, authorization = true, headers: object = {}) {
    let httpHeaders = HttpService.setHttpHeaders(headers);
    if (authorization) {
      httpHeaders = HttpService.addAuthenticationHeader(httpHeaders);
    }
    const request = this.http.get(environment.apiUrl + url, {headers: httpHeaders}).toPromise();
    request.then(response => {

    }).catch((err: HttpErrorResponse) => {
      if (err.status === 401) {
        HttpService.logOut();
      }
      // console.log('err.error', err);
      if ('message' in err.error) {
        this.toastr.error(err.error.message);
      } else {
        this.toastr.error(err.statusText);
      }
    });
    return request;
  }
}
