import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DentroComponent} from "./dentro/dentro.component";
import {PersonalComponent} from "./personal/personal.component";
import {RegisterComponent} from "./register/register.component";
import {RegisterFormComponent} from "./register/register-form/register-form.component";
import {InterestChooserComponent} from "./register/interest-chooser/interest-chooser.component";
import {NewsComponent} from "./news/news.component";
import {SocialComponent} from "./social/social.component";
import {ProfileComponent} from "./profile/profile.component";
import {SettingsComponent} from "./profile/settings/settings.component";
import {FriendsComponent} from "./profile/friends/friends.component";
import {PostListComponent} from "./post-list/post-list.component";
import {PostListWrapperComponent} from "./profile/post-list-wrapper/post-list-wrapper.component";
import {UserComponent} from "./user/user.component";
import {UserProfileComponent} from "./user/user-profile/user-profile.component";
import {UserFriendsComponent} from "./user/user-friends/user-friends.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/news/all/1', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'news', redirectTo: '/news/all/1', pathMatch: 'full'},
  {path: 'news/:category', redirectTo: '/news/:category/1', pathMatch: 'full'},
  {path: 'news/:category/:page', component: NewsComponent},
  {path: 'social', component: SocialComponent},
  {path: 'profile', component: ProfileComponent,
    children: [
      {path: '', redirectTo: 'posts', pathMatch: 'full'},
      {path: 'posts', component: PostListWrapperComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'friends', component: FriendsComponent},
    ]
  },
  {path: 'register', component: RegisterComponent,
    children: [
      {path: '', redirectTo: 'form', pathMatch: 'full'},
      {path: 'form', component: RegisterFormComponent},
      {path: 'categories', component: InterestChooserComponent},
    ]
  },
  {path: 'user/:id', component: UserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

