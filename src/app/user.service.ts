import {User, UserGrosso} from './user.model';
import {Injectable, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {ServerService} from './server.service';
import {Router} from '@angular/router';

@Injectable()
export class UserService {
  user: UserGrosso;

  constructor(private http: Http,
              private router: Router) {}

  basicLogin() {

  }

  facebookLogin() {

  }

  googleLogin() {

  }

  logout() {
    this.user = null;
    localStorage.removeItem('JWT');
    localStorage.removeItem('USER');
    this.router.navigate(['/login']);
  }

  setUser(user: UserGrosso) {
    this.user = user;
  }

  createUserFromObj(userObj) {
    console.log(userObj);
    const user = new UserGrosso(userObj.id, userObj.name, userObj.email, userObj.image, userObj.categories, userObj.friends, userObj.pending);
    this.user = user;
  }

  toJson() {
    return JSON.stringify(this.user);
  }

}
