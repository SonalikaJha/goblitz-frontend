import { UtilityService } from 'src/app/services/utility.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { exists } from 'fs';

@Component({
  selector: 'app-popular-channels',
  templateUrl: './popular-channels.component.html',
  styleUrls: ['./popular-channels.component.scss']
})
export class PopularChannelsComponent implements OnInit, OnDestroy {
  containerHeight = 800;
  channels: any = [[], [], []

    // [
    //   { name: 'Arit', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'abhishek', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'Sonu', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'priyank', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'ankush', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'malik', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'tanmay', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'sutej', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'deepak', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'shambhu', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'aditya', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'shyam', views: '72.5K', subscribes: '1M', link: '' },
    // ],
    // [
    //   { name: 'abhay', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'rohan', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'vikrant', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'amit', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'manish', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'abhishek', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'balram', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'gaurav', views: '72.5K', subscribes: '1M', link: '' },
    // ],
    // [
    //   { name: 'neeraj', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'narendra', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'udham', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'pankaj', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'arjun', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'bittu', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'mohit', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'rohit', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'akshit', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'harpreet', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'mukul', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'trivendra', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'saurav', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'mayank', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'jatin', views: '72.5K', subscribes: '1M', link: '' },
    //   { name: 'atharv', views: '72.5K', subscribes: '1M', link: '' },
    // ]
  ];

  counters = Array(this.channels.length).fill(0);

  channelAnimations = [0, 0, 0];

  animate = [true, true, true];

  tickers = Array(this.channels.length).fill(undefined);

  speed = [15, 30, 23];

  constructor(private utilityService: UtilityService) { }

  ngOnInit() {
    this.startScroller();
    this.utilityService.getRecommendedChannelList().then(res => {
      // let first = res['data'];
      // let second = [...first.reverse()];
      // let third = first;
      // this.channels[0] = first;
      // this.channels[1] = second;
      // this.channels[2] = third;
      const dividedLength = Math.ceil(res['data'].length / 3);
      let data = [...res['data']];
      let indexToRemove = 0;
      let numberToRemove = dividedLength;
      let first = data.splice(indexToRemove, numberToRemove)
      first.forEach(res => {
        this.channels[0].push(res);
      })

      let second = data.splice(indexToRemove, numberToRemove)
      second.forEach(res => {
        this.channels[1].push(res);
      })
      let third = data;
      third.forEach(res => {
        this.channels[2].push(res)
      })
    })

  }

  getIntFromPX(value = '0px') {
    return parseInt(value.replace('px', ''), 10);
  }

  pauseScroller(index = 0) {
    this.animate[index] = false;
  }

  restartScroller(index = 0) {
    this.animate[index] = true;
  }

  startScroller() {
    this.channels.forEach((channel, index) => {
      this.tickers[index] =
        setInterval(() => {
          const row = $('.vertical-scroller').eq(index);
          const card = row.find('.scroller-child');
          if (this.animate[index]) {
            if (this.getIntFromPX(row.css('top')) < -(this.getIntFromPX(card.css('margin-bottom')) + card.height())) {
              this.counters[index] = 0;
              this.channels[index].push(this.channels[index].shift());
            }
            row.css({
              top: this.counters[index] + 'px'
            });
            this.counters[index]--;
          }
        }, this.speed[index]);
    });
  }

  ngOnDestroy() {
    this.tickers.forEach(ticker => {
      clearInterval(ticker);
    });
  }

  getItems(item) {
    const obj = {
      name: item.username,
      views: item.viewersCount,
      subscribers: 0,
      link: '',
      userProfileImage: this.utilityService.getImageUrl(item.userProfileImage),
      followersCount: item['followersCount']
    }
    return obj;
  }

}
