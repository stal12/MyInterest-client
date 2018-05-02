import {Component, OnDestroy, OnInit} from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Error} from 'tslint/lib/error';
import {Router} from '@angular/router';
import {AuthService} from 'angular2-social-login';
import {Subscription} from 'rxjs/Subscription';
import {SadrouterService} from '../sadrouter.service';
import {ServerService} from '../server.service';
import {UserService} from "../user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  loginForm: FormGroup;
  failedAccess = false;
  loginSubscription = new Subscription();
  facebookLoginSubscription = new Subscription();

  constructor(private http: Http,
              private router: Router,
              private auth: AuthService,
              private sadrouter: SadrouterService,
              private serverService: ServerService,
              private userService: UserService) { }

  ngOnInit() {
    console.log('carico login component');
  }

  onFacebookLogin() {
    this.serverService.facebookLogin();
  }

  onFacebookRegister() {
    this.serverService.facebookRegister();
  }

}
