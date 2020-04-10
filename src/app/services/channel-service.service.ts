import {Injectable} from '@angular/core';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelServiceService {
  private routes = {
    recentBroadcasts: 'v1/recent-broadcasts'
  };

  constructor(private http: HttpService) {
  }

  public async getRecentBroadcasts() {
    const response: any = await this.http.get(this.routes.recentBroadcasts);
    return response.data;
  }
}
