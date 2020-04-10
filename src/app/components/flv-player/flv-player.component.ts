import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import flvjs from 'flv.js';

@Component({
  selector: 'app-flv-player',
  templateUrl: './flv-player.component.html',
  styleUrls: ['./flv-player.component.scss']
})
export class FlvPlayerComponent implements OnInit {

  @Input() videoFormat: string;
  @Input() controls: boolean;
  @Input() src: string;

  @ViewChild('pRef', {static: true}) pRef: ElementRef;

  video;
  inErrorState = false;

  constructor() { }

  ngOnInit() {
    this.createPlayer();
    // console.log('controls', this.controls);
    if (this.controls) {
      // console.log('this.pRef.nativeElement', this.pRef.nativeElement);
      this.pRef.nativeElement.setAttribute('controls', true);
    }
  }

  createPlayer() {
    if (flvjs.isSupported()) {
      const videoElement = document.getElementById('videoElement');
      this.video = flvjs.createPlayer({
        type: this.videoFormat,
        isLive: true,
        url: this.src
      });
      this.video.attachMediaElement(videoElement as HTMLMediaElement);
      this.video.load();
      this.video.play();
    }
  }

  playVideo() {
    if (this.inErrorState) {
      this.createPlayer();
    } else {
      this.video.play();
    }
  }

  pauseVideo() {
    if (this.video) {
      this.video.pause();
    }
    // console.log('this.video', this.video);
  }
}
