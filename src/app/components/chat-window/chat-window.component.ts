import { UtilityService } from './../../services/utility.service';
import User from 'src/app/models/user';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { ActivatedRoute } from '@angular/router';
import ChatPayload from 'src/app/models/chat_payload';
import * as moment from 'moment';
import { iif } from 'rxjs';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, AfterViewInit {
  showEmojiPicker = false;
  isSidebarVisible = true;
  icons = '';
  chatForm: FormGroup;

  userColor = [
    'text-pure-gray',
    // 'text-pure-black',
    'text-pure-red',
    'text-pure-maroon',
    // 'text-pure-yellow',
    'text-pure-olive',
    'text-pure-lime',
    'text-pure-green',
    'text-pure-aqua',
    'text-pure-teal',
    'text-pure-blue',
    'text-pure-navy',
    'text-pure-fuchsia',
    'text-pure-purple'
  ];

  userList = {};

  messages = [];

  streamKey: string;
  authFormType: number;
  isAuthFormVisible: boolean;
  isShiftDown = false;

  constructor(
    private socket: Socket,
    private route: ActivatedRoute,
    private authService: AuthService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.chatForm = new FormGroup({
      message: new FormControl()
    });
    this.getStreamKey();
    this.initializeSocketConnection();
  }

  ngAfterViewInit() {
    this.scrollToChatBottom();
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  getStreamKey() {
    this.route.paramMap.subscribe(paramMap => {
      this.streamKey = paramMap.get('streamkey');
    });
  }

  getChatColor() {
    return this.userColor[Math.floor(Math.random() * this.userColor.length)];
  }

  get user(): User {
    const user = this.authService.user as User;
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  initializeSocketConnection() {
    this.socket.on('streamchatmessage', (payload) => {

     // console.log("socket id::",this.socket.id);
      if (this.streamKey === payload.streamkey) {
        // add if user not in list
        const user = payload.message.user;
        if (!(user in this.userList)) {
          this.userList[user] = this.getChatColor();
        }
        // add if user not in list end
        payload.message.message = payload.message.message.replace(/(\n){2,}/g, '\n').replace(/\n/g, '<br>');
        this.messages.push(payload.message);
        this.scrollToChatBottom();
      }
    });

     this.storeUserData();
  }

  async storeUserData(){
    //@ts-ignore
    let channel = await this.route.params.value.userName;
    this.socket.emit("storeUserId",{'channel':channel});
  }

  getFormattedTime(date: Date) {
    return date;
  }

  showAuthForm(type = 0) {
    this.authFormType = type;
    this.isAuthFormVisible = true;
  }

  notLive(type = 0) {
    this.authFormType = type;
  }

  hideAuthForm() {
    this.authFormType = null;
    this.isAuthFormVisible = false;
  }

  verifyUser() {
    if (this.isAuthFormVisible) {
      return;
    }
    if (!this.user) {
      this.utilityService.toastr.error('Only logged user can chat!', null, { positionClass: 'toast-top-center' });

      return this.showAuthForm(0);
    }
  }

  releaseShift(event) {
    if (event.key === 'Shift') {
      this.isShiftDown = false;
    }
    if (event.key === 'Enter' && !this.isShiftDown) {
      event.target.innerText = '';
    }
  }

  captureShift(event) {
    if (event.key === 'Shift') {
      this.isShiftDown = true;
    }
  }

  addEmoji(evt) {
    this.icons = '';
    let textedData = ''
    textedData = document.getElementsByClassName('myEmojiClass')[0]['innerText'];
    console.log('it is texted data => ', textedData)
    // console.log('before ',evt.emoji.native)
    this.icons += evt.emoji.native;
    document.getElementsByClassName('myEmojiClass')[0].innerHTML = textedData + this.icons;
    console.log('after icons => ', this.icons);
    console.log(' after it is texted data =>', textedData)
  }

  async sendMessage(event) {

    if (this.isShiftDown && event.key === 'Enter') {
      return;
    }
    if (!this.isShiftDown && event.key === 'Enter') {
      console.log('this is chat module', this.utilityService.GlobalIsLive)
      if (!this.utilityService.GlobalIsLive) {
        this.messages = [];
        this.utilityService.toastr.error('Only during live stream', null, { positionClass: 'toast-top-center' });
        return;
      }
      if (event.target.innerText.trim() === '') {
        return;
      }
      //@ts-ignore
      let to = await this.route.params.value.userName;
      //console.log("to",to);
      const payload = new ChatPayload();
      payload.streamkey = this.streamKey;
      payload.token = this.user.token;
      payload.to=to;
      //  
      payload.message = {
        user: this.user.username,
        message: event.target.innerText + this.icons
      };

      this.showEmojiPicker = false;
      event.target.innerText = '';
      this.icons = '';
      //console.log("payload",payload);
     // console.log("sender socket id::",this.socket.id);
      this.socket.emit('streamchatmessage', payload);
    }
  }
  // sendMessage() {
  //   if (!this.user) {
  //     this.utilityService.toastr.error('Only logged user can chat!', null, { positionClass: 'toast-top-center' });
  //     return this.showAuthForm(0);
  //   }
  //   const payload = new ChatPayload();
  //   payload.streamkey = this.streamKey;
  //   payload.token = this.user.token;
  //   payload.message = {
  //     user: this.user.username,
  //     message: this.chatForm.controls.message.value
  //   };
  //   this.chatForm.reset();
  //   this.socket.emit('streamchatmessage', payload);
  // }

  scrollToChatBottom() {
    // FIXME: Find alternate way to fix it
    // const userMessages = document.querySelectorAll('.user-message');
    // console.log(this.messages.length, userMessages.length);
    // if (userMessages) {
    //   let height = -100;
    //   (userMessages).forEach(child => {
    //     {
    //       // console.log(child);
    //       height += (child as HTMLElement).offsetHeight;
    //     }
    //   });
    //   console.log(height);
    setTimeout(() => {
      document.querySelector('.chat>div').scrollTo(0, document.querySelector('.chat>div').scrollHeight);
    }, 100);
    // }
  }

}
