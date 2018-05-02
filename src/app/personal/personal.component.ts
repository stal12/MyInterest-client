import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {SadrouterService} from "../sadrouter.service";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit, OnDestroy {
  username = '';
  email = '';
  httpSubscription = new Subscription();

  constructor(private http: Http,
              private router: Router,
              private zone: NgZone,
              private sadrouter: SadrouterService) {}

  ngOnInit() {
    console.log('CARICO LA PAGINA');
    const token = localStorage.getItem(('JWT'));
    console.log(token);
     if (token == null) {
       this.router.navigate(['/login']);
       this.sadrouter.navigate('login');
     } else {
      const headers = new Headers();
      headers.append('Authorization', localStorage.getItem('JWT'));
      const options = new RequestOptions({headers: headers});
      this.httpSubscription = this.http.get('http://192.168.1.111:8000/personal/', options).subscribe(
        (response: Response) => {
          console.log(response);
          const usrObj = response.json();
          this.username = usrObj.username;
          this.email = usrObj.email;
        }, (error: Error) => {
          console.log(error);
          this.router.navigate(['/login']);
          this.sadrouter.navigate('login');
        }
      );
     }
  }

  onLogout() {
    localStorage.removeItem('JWT');
    this.router.navigate(['/login']);
    this.sadrouter.navigate('login');
  }

  ngOnDestroy() {
    console.log('DISTRUGGO LA PAGINA');
    this.httpSubscription.unsubscribe();
  }

}
