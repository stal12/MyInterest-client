import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Error} from 'tslint/lib/error';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {SadrouterService} from "../sadrouter.service";

@Component({
  selector: 'app-dentro',
  templateUrl: './dentro.component.html',
  styleUrls: ['./dentro.component.css']
})
export class DentroComponent implements OnInit, OnDestroy {
  httpSubscription = new Subscription();

  constructor(private http: Http,
              private router: Router,
              private zone: NgZone,
              private sadrouter: SadrouterService) { }

  ngOnInit() {
  }

  onRequestInfo() {
    const token = localStorage.getItem(('JWT'));
    console.log(token);
    if (token == null) {
      this.router.navigate(['/login']);
      this.sadrouter.navigate('login');
    } else {
      const headers = new Headers();
      headers.append('Authorization', localStorage.getItem('JWT'));
      const options = new RequestOptions({headers: headers});
      this.httpSubscription = this.http.get('http://192.168.1.111:8000/prova/', options).subscribe(
        (response: Response) => {
          console.log(response);
        }, (error: Error) => {
          console.log(error);
        }
      );
    }
  }

  onLogout() {
    localStorage.removeItem('JWT');
    this.router.navigate(['/login/']);
    this.sadrouter.navigate('login');
  }

  onPersonal() {
    this.router.navigate(['/personal/']);
    this.sadrouter.navigate('personal');
  }

  ngOnDestroy() {
    this.httpSubscription.unsubscribe();
  }

}
