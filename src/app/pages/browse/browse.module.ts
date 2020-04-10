import { ComponentsModule } from './../../components/components.module';
import { Routes, RouterModule } from '@angular/router';
import { OwlModule } from 'ngx-owl-carousel';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryPageComponent } from './category-page/category-page.component';
import { BrowseComponent } from './browse.component';
import { ChannelPageComponent } from './channel-page/channel-page.component';
import { AllChannelPageComponent } from './all-channel-page/all-channel-page.component';
import { RecentVideosComponent } from './recent-videos/recent-videos.component';
import {FormsModule} from "@angular/forms";
import { SafePipe } from './safe.pipe';

export const routes: Routes = [
  { path: 'categories', component: CategoryPageComponent },
  { path: 'channels', component: ChannelPageComponent },
  { path: 'allChannels', component: AllChannelPageComponent },
  { path: 'recentVideos', component: RecentVideosComponent },


];

@NgModule({
  declarations: [
    CategoryPageComponent,
    BrowseComponent,
    ChannelPageComponent,
    AllChannelPageComponent,
    RecentVideosComponent,
    SafePipe],
    imports: [
        CommonModule,
        OwlModule,
        ComponentsModule,
        RouterModule.forChild(routes),
        FormsModule
    ],
  exports: [
    BrowseComponent
  ]
})
export class BrowseModule { }
