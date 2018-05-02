import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../user.model";

import {MaterializeAction} from 'angular2-materialize';
import {ServerService} from "../../server.service";
import {DataService} from "../../data.service";
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit, OnDestroy {
  deleteIndex = 0;
  friends: User[];
  pendingFriends: User[];   // vanno mostrati da qualche parte
  modalActions = new EventEmitter<string|MaterializeAction>();
  ready: boolean;

  friendsChangedSubscription: Subscription;
  pendingFriendsChangedSubscription: Subscription;

  constructor(private serverService: ServerService,
              private dataService: DataService,
              private userService: UserService) { }

  ngOnInit() {
    this.friends = [];
    this.pendingFriends = [];
    this.ready = false;

    this.serverService.fetchFriends(this.userService.user.id);
    this.friendsChangedSubscription = this.dataService.friendsChanged.subscribe(
      (friends: User[]) => {
        this.friends = friends;
        console.log(friends);
        this.ready = true;
      }
    );

    this.serverService.fetchPendingFriends();
    this.pendingFriendsChangedSubscription = this.dataService.pendingFriendsChanged.subscribe(
      (pendingFriends: User[]) => {
        this.pendingFriends = pendingFriends;
        console.log(pendingFriends);

      }
    );

  }

  onDelete() {
    if (this.deleteIndex > -1) {
      this.serverService.deleteFriend(this.friends[this.deleteIndex].id);
      this.friends.splice(this.deleteIndex, 1);
      this.userService.user.friends.splice(this.deleteIndex, 1);
    }
  }

  onAccept(index: number) {
    this.serverService.acceptFriend(this.pendingFriends[index].id);
    this.friends.push(this.pendingFriends[index]);
    this.pendingFriends.splice(index, 1);
    this.dataService.setFriends(this.friends.slice());
    this.dataService.setPendingFriends(this.pendingFriends.slice());
  }

  onCancel(index: number) {
    this.serverService.cancelFriend(this.pendingFriends[index].id);
    this.pendingFriends.splice(index, 1);
    this.dataService.setPendingFriends(this.pendingFriends.slice());
  }

  openModal(i: number) {
    this.deleteIndex = i;
    this.modalActions.emit({action: "modal", params: ['open']});
  }

  closeModal() {
    this.modalActions.emit({action: "modal", params: ['close']});
  }

  ngOnDestroy() {
    this.friendsChangedSubscription.unsubscribe();
    this.pendingFriendsChangedSubscription.unsubscribe();
  }

}
