import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserService} from "../user.service";
import {Item} from "../item.model";
import {Post, Comment} from "../post.model";
import {User, UserGrosso} from "../user.model";
import {ServerService} from "../server.service";
import {Subscription} from "rxjs/Subscription";
import {DataService} from "../data.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  id: number;
  friends = false;
  tab = 'profile';
  user: UserGrosso;

  userChangedSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private serverService: ServerService,
              private dataService: DataService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        if (this.userService.user.id === this.id) {
          this.router.navigate(['/profile']);
        }
        if (this.userService.user.friends.includes(this.id)) {
          this.friends = true;
        }
        console.log('friends' + this.id);

        // qualcosa va fatto
        // suggeriscono di retrievare l'user grosso dal zerver
        // this.user = new UserGrosso(56, 'Carlo Martello', '', 'http://www.meteoweb.eu/wp-content/uploads/2015/10/carlomagno.jpg', ['politics', 'sport', 'entertainment'], [1, 2, 3]);

        this.serverService.fetchPerson(this.id);
        this.userChangedSubscription = this.dataService.userChanged.subscribe(
          (user: UserGrosso) => {
            this.user = user;
            console.log(user);
          }
        );

      }
    );
  }

  onClickTab(tab: string) {
    this.tab = tab;
  }

  onRequestFriendship() {
    this.serverService.requestFriend(this.id);
  }

  ngOnDestroy() {
    this.userChangedSubscription.unsubscribe();
  }

}
