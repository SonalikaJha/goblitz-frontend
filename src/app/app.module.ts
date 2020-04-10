import {DashboardModule} from "./pages/dashboard/dashboard-components/dashboard.module";
import {BrowseModule} from "./pages/browse/browse.module";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";

import {OwlModule} from "ngx-owl-carousel";
import {ComponentsModule} from "./components/components.module";
import {StreamPageComponent} from "./pages/stream-page/stream-page.component";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {PlaybacksPageComponent} from "./pages/playbacks-page/playbacks-page.component";
import {SelectDropDownModule} from "ngx-select-dropdown";
import {AdminComponent} from "./pages/admin/admin.component";
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms";
import {TagsComponent} from "./pages/tags/tags.component";
import {BrowseSerchComponent} from "./pages/browse-serch/browse-serch.component";
import {GameComponent} from "./pages/game/game.component";
import {RouterModule} from "@angular/router";
import {AuthGaurdServiceService} from "./services/auth-gaurd-service.service";
import {ForgetPasswordComponent} from './pages/forget-password/forget-password.component';
import {ActivateAccountComponent} from './pages/activate-account/activate-account.component';
import { TagInputModule } from 'ngx-chips';

// import { TagInputModule } from 'ngx-chips';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    StreamPageComponent,
    PlaybacksPageComponent,
    AdminComponent,
    TagsComponent,
    BrowseSerchComponent,
    GameComponent,
    ForgetPasswordComponent,
    ActivateAccountComponent,

  ],
  imports: [
    TagInputModule,
    BrowserModule,
    AppRoutingModule,
    OwlModule,
    BrowserAnimationsModule,
    ComponentsModule,
    BrowseModule,
    DashboardModule,
    ReactiveFormsModule,
    HttpClientModule,
    SelectDropDownModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [AuthGaurdServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
