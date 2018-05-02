import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {DataService} from '../data.service';
import {ServerService} from '../server.service';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../user.model';
import {MaterializeDirective} from 'angular2-materialize';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  autocompleteInit = {
    'data': {},
    onAutocomplete: (val) => {
      console.log(val);
      const user = this.users.find(x => x.name === val);
      console.log(user.id);
      this.router.navigateByUrl('/user/' + user.id);
    },
  };
  isDisabled = true;
  users = [];
  usersChangedSubscription: Subscription;

  constructor(protected userService: UserService,
              private dataService: DataService,
              private serverService: ServerService,
              private router: Router
             ) { }

  ngOnInit() {
    this.serverService.fetchUsers();
    this.usersChangedSubscription = this.dataService.usersChanged.subscribe(
      (users: User[]) => {
        this.users = users;
        const user_list = {};
        for (const user of users) {
          user_list[user.name] = user.image;
        }
        this.autocompleteInit['data'] = user_list;
        console.log(user_list);
        console.log(this.autocompleteInit);
        this.isDisabled = false;
      }
    );

  }

  onShowUser() {
    console.log(this.userService.user);
  }

  ngOnDestroy() {
    this.usersChangedSubscription.unsubscribe();
  }

}
