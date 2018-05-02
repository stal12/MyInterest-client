import {Component, OnDestroy, OnInit} from '@angular/core';
import {Angular2SocialLoginModule} from 'angular2-social-login';
import {SadrouterService} from './sadrouter.service';
import {Subscription} from "rxjs/Subscription";
import {UserGrosso} from "./user.model";
import {UserService} from "./user.service";
import {Router} from '@angular/router';
import {ServerService} from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  path = 'login';
  routerSubscription: Subscription;

  providers = {
    'facebook': {
      'clientId': '147361039328730',
      'apiVersion': 'v2.10' // like v2.4
    }
  };

  constructor(private sadrouter: SadrouterService,
              private userService: UserService,
              private serverService: ServerService,
              private router: Router) {}

  ngOnInit() {

    Angular2SocialLoginModule.loadProvidersScripts(this.providers);

    console.log('carico app component');
    this.userService.user = JSON.parse(localStorage.getItem('USER'));
    console.log('ecco il nostro utente preferito');
    console.log(this.userService.user);
    if (this.userService.user === null) {
      console.log('navigo al login');
      this.router.navigate(['/login']);
    }

    /*
    if (!this.userService.user) {
      this.router.navigate(['/login']);
    } else {
      this.sadrouter.path.subscribe(
        (value: string) => {
          this.path = value;
        }
      );
    }
    */
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
