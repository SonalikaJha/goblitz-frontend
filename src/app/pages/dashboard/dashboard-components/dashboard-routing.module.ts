import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StreamManagerComponent } from './stream-manager/stream-manager.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VideoComponent } from './video/video.component';
import {FollowerComponent} from './follower/follower.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGaurdServiceService } from 'src/app/services/auth-gaurd-service.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'stream-manager',
    pathMatch: 'full'
  },
  {
    path: 'stream-manager',
    canActivate: [AuthGaurdServiceService],
    component: StreamManagerComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGaurdServiceService],
    component: UserProfileComponent
  },
  {
    path: ':userName/videos',
    component: VideoComponent
  },
  {
    path: ':username/followers',
    component: FollowerComponent
  },
  {
    path: 'profiles',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
