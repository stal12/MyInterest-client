import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Item} from "../../item.model";
import {MaterializeAction} from "angular2-materialize";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../post.model";
import {UserService} from "../../user.service";
import {ServerService} from "../../server.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  modalActions = new EventEmitter<string|MaterializeAction>();
  postForm: FormGroup;

  @Input('item') item: Item;
  //   = new Item(
  //   'Modenese fa la cacca in giardino',
  //   'Si chiama Stefano Allegretti',
  //   'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/15895291_699442833593939_6554684078952107603_n.jpg?oh=b9109de19cbcd1f8fcb08a944bf25a01&oe=5AA91265',
  //   'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/15895291_699442833593939_6554684078952107603_n.jpg?oh=b9109de19cbcd1f8fcb08a944bf25a01&oe=5AA91265',
  //   new Date().toString(),
  //   'entertainment'
  // );

  constructor(private userService: UserService,
              private serverService: ServerService) { }

  ngOnInit() {
    this.initForm();
  }

  openModal() {
    this.modalActions.emit({action: "modal", params: ['open']});
  }
  closeModal() {
    this.modalActions.emit({action: "modal", params: ['close']});
  }

  private initForm() {
    this.postForm = new FormGroup(
      {
        'title': new FormControl('', [Validators.required])
      }
    );
  }

  onSubmit() {
    console.log(this.postForm.getRawValue());
    this.modalActions.emit({action: "modal", params: ['close']});
    this.postPost();
  }

  postPost() {
    const post = new Post(-1, this.userService.user, this.item, this.postForm.getRawValue()['title'], [], [/*temporaneamente*/], [], false, null);
    this.serverService.storePost(post);
  }

}


