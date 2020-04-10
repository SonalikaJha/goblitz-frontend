import { environment } from '../../../environments/environment';
import { UtilityService } from '../../services/utility.service';
import { Component, OnInit, Input, ElementRef, OnDestroy, Output, EventEmitter } from '@angular/core';
// import Hls from 'hls.js';
import * as moment from 'moment';

// @Component({
//   selector: 'app-hls-player',
//   templateUrl: './hls-player.component.html',
//   styleUrls: ['./hls-player.component.scss']
// })
export class HlsPlayerComponent implements OnInit, OnDestroy {
//
//   @Input() streamKey: string;
//   @Input() streamer: any;
//
//   @Input() options = {
//     controls: true,
//     streamerInfo: true,
//     streamerInfoAlwaysVisible: false
//   };
//
//   @Output() theatreModeEmitter = new EventEmitter();
//
//   theatreMode = false;
//
//   component: HTMLElement;
//   video: HTMLVideoElement;
//   videoplayer: HTMLElement;
//   inErrorState = false;
//   additionalDetailsVisible = false;
//   // hls = new Hls();
//   eventListeners = [];
//
//   constructor(private host: ElementRef, private utilityService: UtilityService) { }
//
  ngOnInit() {
//   //   this.component = this.host.nativeElement;
//   //   this.videoplayer = this.component.firstElementChild as HTMLElement;
//   //   console.log(this.videoplayer);
//   //   this.hlsErrorHandler();
//   //   this.createPlayer();
//   //   this.eventListeners.push(window.addEventListener('keydown', (event) => {
//   //     if (event.key === 'Escape' && environment.isFullscreen) {
//   //       environment.isFullscreen = false;
//   //     }
//   //   }));
//   //
//   //   this.eventListeners.push(document.documentElement.addEventListener('fullscreenchange', e => {
//   //     if (this.isFullscreen) {
//   //       this.stopFullscreen();
//   //     } else {
//   //       this.goFullscreen();
//   //     }
//   //   }));
//   //   // console.log(moment().format('hh:mm:ss'));
//   //   console.log(this.streamer);
  }
//
  ngOnDestroy() {
//     this.eventListeners.forEach(e => {
//       removeEventListener('keydown', e);
//     });
//     this.stopFullscreen();
//   }
//
//   get isFullscreen(): boolean {
//     return environment.isFullscreen;
  }
//
//   // hlsErrorHandler() {
//   //   this.hls.on(Hls.Events.ERROR, (event, data) => {
//   //     console.log(event, data);
//   //     this.inErrorState = true;
//   //     switch (data.details) {
//   //       case Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
//   //       case Hls.ErrorDetails.MANIFEST_LOAD_TIMEOUT:
//   //         this.getSavior('Stream unavailable.');
//   //         break;
//   //       default:
//   //         break;
//   //     }
//   //   });
//   // }
//
//   getSavior(message = 'Somebody is streaming') {
//     this.videoplayer.innerHTML = '';
//     const img = document.createElement('img');
//     img.src = 'https://via.placeholder.com/1920x1080.jpg?text=' + message;
//     this.videoplayer.appendChild(img);
//   }
//
//   createPlayer() {
//     // create and append script to this component
//     // const hlsPlayerCDN = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
//     // const hlsScript = document.createElement('script');
//     // hlsScript.src = hlsPlayerCDN;
//     // hlsScript.defer = true;
//     // hlsScript.async = true;
//     // hlsScript.id = 'hlsScript';
//     // this.nativeElement.innerHTML = '';
//     // this.nativeElement.appendChild(hlsScript);
//
//
//     // remove old element and add player
//     this.videoplayer.innerHTML = '';
//
//     // create video element
//     this.video = document.createElement('video');
//     this.video.autoplay = true;
//     this.video.style.maxWidth = '1000px';
//     this.video.style.width = '100%';
//     this.videoplayer.appendChild(this.video);
//     try {
//       if (Hls.isSupported()) {
//         this.hls.loadSource(this.getStreamUrl());
//         this.hls.attachMedia(this.video);
//         this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
//           this.inErrorState = false;
//           this.video.play();
//         });
//       } else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
//         this.video.src = this.getStreamUrl();
//         this.video.addEventListener('loadedmetadata', () => {
//           this.inErrorState = false;
//           this.video.play();
//         });
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   }
//
//   goFullscreen() {
//     environment.isFullscreen = true;
//     window.scrollTo(0, 0);
//     document.documentElement.style.overflowY = 'hidden';
//
//     // change video css
//     this.video.style.maxWidth = 'none';
//     this.video.style.width = '100%';
//   }
//
//   requestFullscreen() {
//     document.documentElement.requestFullscreen();
//   }
//
//   exitFullscreen() {
//     document.exitFullscreen();
//   }
//
//   stopFullscreen() {
//     environment.isFullscreen = false;
//     document.documentElement.style.overflowY = 'auto';
//     this.video.style.maxWidth = '1000px';
//     this.video.style.width = 'none';
//     // change video css
//   }
//
//   jumpToLive() {
//     this.video.currentTime = this.video.duration - 1;
//   }
//
//   toggleTheatre() {
//     this.theatreMode = !this.theatreMode;
//     this.theatreModeEmitter.emit(this.theatreMode);
//   }
//
//   showAdditionalDetails() {
//     this.additionalDetailsVisible = true;
//   }
//
//   hideAdditionalDetails() {
//     this.additionalDetailsVisible = false;
//   }
//
//   getStreamUrl(): string {
//     return 'http://13.126.194.8:8080/hls/' + this.streamKey + '.m3u8';
//   }
//
//   playVideo() {
//     if (this.inErrorState) {
//       this.createPlayer();
//     } else {
//       this.video.play();
//     }
//   }
//
//   pauseVideo() {
//     if (this.video) {
//       this.video.pause();
//     }
//   }
//
//
//
}
