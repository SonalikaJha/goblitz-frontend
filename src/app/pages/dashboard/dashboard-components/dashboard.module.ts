import { StreamInfoDialogComponent } from "./../../../components/stream-info-dialog/stream-info-dialog.component";

import { SelectDropDownModule } from "ngx-select-dropdown";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "../dashboard.component";
import { StreamManagerComponent } from "./stream-manager/stream-manager.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FollowerComponent } from "./follower/follower.component";
import { FollowingComponent } from "./following/following.component";
import { SubscriberComponent } from "./subscriber/subscriber.component";
import { VideoComponent } from "./video/video.component";
import { ComponentsModule } from "../../../components/components.module";
import { DatePickerModule } from "@syncfusion/ej2-angular-calendars";
import { ProfileComponent } from './profile/profile.component';
import { DeactivateAccountComponent } from './deactivate-account/deactivate-account.component';

export const routes: Routes = [
  // { path: 'followers', component: FollowerComponent },
  { path: "following", component: FollowingComponent },
  { path: "subscriber", component: SubscriberComponent },
  { path: "deactivate-account", component: DeactivateAccountComponent },
  
];

@NgModule({
  declarations: [
    DashboardComponent,
    StreamInfoDialogComponent,
    StreamManagerComponent,
    UserProfileComponent,
    FollowerComponent,
    FollowingComponent,
    SubscriberComponent,
    VideoComponent,
    ProfileComponent,
    DeactivateAccountComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    SelectDropDownModule,
    ComponentsModule,
    DatePickerModule,
    RouterModule.forChild(routes)
  ],
  exports: [DashboardComponent, StreamInfoDialogComponent]
})
export class DashboardModule {}
