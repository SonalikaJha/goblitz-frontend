import { HowToStreamComponent } from './components/how-to-stream/how-to-stream.component';
import { CommunityGuidelinesComponent } from './components/community-guidelines/community-guidelines.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import {AdminComponent} from './pages/admin/admin.component';
import {TagsComponent} from './pages/tags/tags.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {StreamPageComponent} from './pages/stream-page/stream-page.component';
import {BrowseComponent} from './pages/browse/browse.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {PlaybacksPageComponent} from './pages/playbacks-page/playbacks-page.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {from} from 'rxjs';
import {BrowseSerchComponent} from './pages/browse-serch/browse-serch.component';
import { GameComponent } from './pages/game/game.component';
import { AuthGaurdServiceService } from './services/auth-gaurd-service.service';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'browse',
    component: BrowseComponent,
    loadChildren: () => import('./pages/browse/browse.module').then(m => m.BrowseModule)
  },
  {
    path: 'admin',
    component: AdminComponent,
    // canActivate: [AuthGaurdServiceService]
  },
  {
    path: 'tags',
    component: TagsComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGaurdServiceService],
    loadChildren: () => import('./pages/dashboard/dashboard-components/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: ':userName/channel',
    component: StreamPageComponent
  },
  {
    path: ':userName/playbacks/:videoId',
    component: PlaybacksPageComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'how-to-stream',
    component: HowToStreamComponent,
  },
  {
    path: 'community-guidelines',
    component: CommunityGuidelinesComponent
  },

  {
    path: 'search/:text',
    component: BrowseSerchComponent,
  },
  {
    path: 'game/:gameTitle',
    component: GameComponent,
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
