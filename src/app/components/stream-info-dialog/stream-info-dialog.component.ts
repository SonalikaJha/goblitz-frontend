import { StreamService } from './../../services/stream.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stream-info-dialog',
  templateUrl: './stream-info-dialog.component.html',
  styleUrls: ['./stream-info-dialog.component.scss']
})
export class StreamInfoDialogComponent implements OnInit {
  placeholder = ''
  isShowLoginComponent = false;
  authFormType: number;
  isAuthFormVisible: boolean;
  filteredBroadcastList: any = [];
  recommendedBroadCastFilter: any = [];
  paramUserName = '';
  loginUserName = '';
  recent = [];
  thumbnailImg: any;
  userProfileData: any;
  streamInfoForm: FormGroup;
  streamer = {
    name: '',
    image: '',
    isLive: false,
    followers: '5M',
    views: '0',
    stream: {
      gameTitle: 'Playing PUBG after a long time!',
      game: {
        title: 'PU',
        image: ''
      },
      gameDescription: 'This is some description about the gamer who is playing the game, that you are watching on go blitz',
      tags: [],
      isLive: false,
      totalLiveViews: 5000,
      startTime: undefined,
      streamOutputUrl: undefined,
      coverImage: undefined,
    }
  };
  gameconfig = {
    displayKey: 'title',
    search: true
  };
  tagconfig = {
    displayKey: 'tag',
    search: true
  };
  constructor(public utilityService: UtilityService,
    private formBuilder: FormBuilder,
    public streamService: StreamService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    // this.menu['classList'].toggle('hidden');
    this.streamInfoForm = this.formBuilder.group(
      {
        gameTitle: ['', Validators.required],
        goLiveInfo: ['', Validators.required],
        selectData: ['', Validators.required],
        tagData: [''],
        image: [''],
        streamId: [''],

      });
    this.utilityService.returnStreamInfo().then(res => {
      this.streamer.stream = res;
      console.log('res wala', res);
      console.log('streamer wala', this.streamer.stream);
      this.openUpdateStreamInfoForm();
    })
  }

  uploadImage() {
    document.getElementById('uploadImg').click();
  }

  changeThumbNailImg(evt) {
    this.streamInfoForm.value.image = evt.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(evt.target.files[0]);
    reader.onload = (event) => {
      this.thumbnailImg = reader.result;
    };
  }

  openUpdateStreamInfoForm() {

    console.log('stream info', this.streamer);
    if (Object.keys(this.streamer.stream).length != 0) {
      this.streamInfoForm.setValue({
        gameTitle: this.streamer.stream['title'],
        goLiveInfo: this.streamer.stream['description'],
        selectData: [this.streamer.stream.game.title != '' ? this.streamer.stream.game : ''],
        tagData: [],
        image: '',
        streamId: this.streamer.stream['streamId'],
      });
      console.log('tag lists =====>', this.utilityService.tagList)
      this.streamer.stream.tags.forEach(ele => {
        this.utilityService.tagList.forEach(element => {
          if (element.tag === ele) {
            console.log('element log ', element);
            this.streamInfoForm.value.tagData.push(element);
          }
        });
      });
      console.log('stream Info form ', this.streamInfoForm);
      this.thumbnailImg = this.streamer.stream['image'];
    }
  }

  async updateStreamInfo() {

    const val = await this.streamService.updateParticularStreamInfo(this.streamInfoForm.value);
    if (val === 'ok') {
    }
  }
}
