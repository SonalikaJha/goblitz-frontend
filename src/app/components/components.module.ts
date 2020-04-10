
import {environment} from '../../environments/environment';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import { SelectDropDownModule } from 'ngx-select-dropdown';

import {NavbarComponent} from './navbar/navbar.component';
import {HeroCarouselComponent} from './hero-carousel/hero-carousel.component';
import {FooterComponent} from './footer/footer.component';
import {PopularChannelsComponent} from './popular-channels/popular-channels.component';
import {ChannelCardComponent} from './channel-card/channel-card.component';
import {RecommendedChannelsComponent} from './recommended-channels/recommended-channels.component';
import {ChannelCardTwoComponent} from './channel-card-two/channel-card-two.component';
import {ChannelCardMiniComponent} from './channel-card-mini/channel-card-mini.component';
import {GameCardComponent} from './game-card/game-card.component';
import {ChannelCardTwoCollectionComponent} from './channel-card-two-collection/channel-card-two-collection.component';
import {LoginCardComponent} from './login-card/login-card.component';
import {ChatWindowComponent} from './chat-window/chat-window.component';
import {FlvPlayerComponent} from './flv-player/flv-player.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LiveChannelsComponent } from './live-channels/live-channels.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { CommunityGuidelinesComponent } from './community-guidelines/community-guidelines.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { HowToStreamComponent } from './how-to-stream/how-to-stream.component'


const config: SocketIoConfig = {url: environment.baseUrl, options: {}};

@NgModule({
  declarations: [
    NavbarComponent,
    HeroCarouselComponent,
    FooterComponent,
    PopularChannelsComponent,
    ChannelCardComponent,
    RecommendedChannelsComponent,
    ChannelCardTwoComponent,
    GameCardComponent,
    ChannelCardMiniComponent,
    ChannelCardTwoCollectionComponent,
    LoginCardComponent,
    ChatWindowComponent,
    FlvPlayerComponent,
    AboutUsComponent,
    LiveChannelsComponent,
    PrivacyPolicyComponent,
    CommunityGuidelinesComponent,
    HowToStreamComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SelectDropDownModule,
    PickerModule,
    EmojiModule,
    SocketIoModule.forRoot(config)
  ],
  exports: [
    NavbarComponent,
    HeroCarouselComponent,
    FooterComponent,
    PopularChannelsComponent,
    ChannelCardComponent,
    RecommendedChannelsComponent,
    ChannelCardTwoComponent,
    GameCardComponent,
    ChannelCardMiniComponent,
    ChannelCardTwoCollectionComponent,
    ChatWindowComponent,
    FlvPlayerComponent,
    AboutUsComponent,
    LiveChannelsComponent,
    LoginCardComponent,
  ]
})
export class ComponentsModule {
}
