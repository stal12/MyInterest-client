import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import { DentroComponent } from './dentro/dentro.component';
import { PersonalComponent } from './personal/personal.component';
import {Angular2SocialLoginModule} from 'angular2-social-login';
import {SadrouterService} from './sadrouter.service';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { RegisterFormComponent } from './register/register-form/register-form.component';
import { InterestChooserComponent } from './register/interest-chooser/interest-chooser.component';
import {UserService} from "./user.service";
import {ServerService} from "./server.service";
import { NewsComponent } from './news/news.component';
import { SocialComponent } from './social/social.component';
import { ItemComponent } from './news/item/item.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './profile/settings/settings.component';
import { FriendsComponent } from './profile/friends/friends.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostListWrapperComponent } from './profile/post-list-wrapper/post-list-wrapper.component';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserFriendsComponent } from './user/user-friends/user-friends.component';
import {DataService} from "./data.service";

const providers = {
  'facebook': {
    'clientId': '147361039328730',
    'apiVersion': 'v2.10' //like v2.4
  },
  'google': {
    'clientId': '56775231399-5ebn7trjngbqk27f2m4icic2l2oqdjmc.apps.googleusercontent.com'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DentroComponent,
    PersonalComponent,
    HeaderComponent,
    RegisterComponent,
    RegisterFormComponent,
    InterestChooserComponent,
    NewsComponent,
    SocialComponent,
    ItemComponent,
    ProfileComponent,
    SettingsComponent,
    FriendsComponent,
    PostListComponent,
    PostListWrapperComponent,
    UserComponent,
    UserProfileComponent,
    UserFriendsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    Angular2SocialLoginModule,
    FormsModule,
    MaterializeModule
  ],
  providers: [SadrouterService, ServerService, UserService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}

console.log('sto per caricare gli script dei provider del log in')
Angular2SocialLoginModule.loadProvidersScripts(providers);

