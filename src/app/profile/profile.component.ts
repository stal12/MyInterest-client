import { Component, OnInit } from '@angular/core';
import {Item} from "../item.model";
import {Post, Comment} from "../post.model";
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {UserGrosso, User} from "../user.model";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  items: Item[];
  posts: Post[];

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    console.log('Carico il profile component');

    if (!this.userService.user) {
      console.log('Nessun utente, dunque navigo al login');
      this.router.navigate(['/login']);
    }
  }

}
