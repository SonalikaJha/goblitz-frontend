import { StreamService } from '../../../../services/stream.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-stream-manager',
  templateUrl: './stream-manager.component.html',
  styleUrls: ['./stream-manager.component.scss']
})
export class StreamManagerComponent implements OnInit {
  obsSettings = {
    url: '',
    stream_key: '',
    data: ''
  };
  copy: any;
  inputUrl: any;

  constructor(private streamService: StreamService) { }

  async ngOnInit() {
    await this.getOBSSettings();
  }

  async getOBSSettings() {
    const response = await this.streamService.getOBSSettings();
    // @ts-ignore
    this.obsSettings = response.data;
  }

  copyValue(input) {
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand('copy');

  }

  public copyStream(copyStream_key) {
    // console.log("copy Stream");
    // console.log("copy Stream");
    copyStream_key.select();
    document.execCommand("copy");
    copyStream_key.setSelectionRange(0, 99999);

  }

}
