import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../user.model";
import {Subscription} from "rxjs/Subscription";
import {ServerService} from "../../server.service";
import {DataService} from "../../data.service";

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.css']
})
export class UserFriendsComponent implements OnInit, OnDestroy {
  @Input() userid: number;
  friends: User[];

  friendsChangedSubscription: Subscription;

  constructor(private serverService: ServerService,
              private dataService: DataService) { }

  ngOnInit() {

    this.friends = [
      new User(1, 'stefano', 'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/15895291_699442833593939_6554684078952107603_n.jpg?oh=b9109de19cbcd1f8fcb08a944bf25a01&oe=5AA91265'),
      new User(2, 'fabio', 'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/21761591_10210306848329563_359549035809606769_n.jpg?oh=5b29ae33ac376efacc9b2cb619073aea&oe=5A67874D'),
      new User(3, 'marco', 'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/21369551_604151943306354_1333951150407067035_n.jpg?oh=46da2041c8ae8c254c5c22ea515a6461&oe=5A9D7383'),
      new User(4, 'nicola', 'https://scontent-mxp1-1.xx.fbcdn.net/v/t31.0-8/10631296_1383645911928116_1801022395856691447_o.jpg?oh=2d105f05971a5b7c5e640bdac1c77ee1&oe=5A9BE5BE')
    ];

    this.serverService.fetchFriends(this.userid);
    this.friendsChangedSubscription = this.dataService.friendsChanged.subscribe(
      (friends: User[]) => {
        this.friends = friends;
        console.log(friends);
      }
    );
  }

  ngOnDestroy() {
    this.friendsChangedSubscription.unsubscribe();
  }


}
