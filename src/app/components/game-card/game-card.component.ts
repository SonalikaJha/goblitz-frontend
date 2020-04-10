import {Component, OnInit, Input} from '@angular/core';
import {UtilityService} from '../../services/utility.service';

class Game {
  name: string;
  image: string;
  views: string;
  tags: Array<string>;
}

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

  @Input() game: Game;

  constructor(private utils: UtilityService) {
  }

  ngOnInit() {
  }

  getImageUrl(url) {
    return this.utils.getImageUrl(url);

  }

}
