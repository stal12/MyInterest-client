import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from "../../item.model";
import {Post, Comment} from "../../post.model";
import {UserService} from "../../user.service";
import {User, UserGrosso} from "../../user.model";
import {Subscription} from "rxjs/Subscription";
import {DataService} from "../../data.service";
import {ServerService} from "../../server.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-post-list-wrapper',
  templateUrl: './post-list-wrapper.component.html',
  styleUrls: ['./post-list-wrapper.component.css']
})
export class PostListWrapperComponent implements OnInit, OnDestroy {
  items: Item[];
  posts: Post[];
  friends: User[];

  myPostsChangedSubscription: Subscription;

  constructor(private userService: UserService,
              private dataService: DataService,
              private serverService: ServerService,
              private router: Router) { }

  ngOnInit() {
    if (!this.userService.user) {
      console.log('Nessun utente, dunque navigo al login');
      this.router.navigate(['/login']);
    } else {
      this.serverService.fetchUserPosts(this.userService.user.id);
      this.myPostsChangedSubscription = this.dataService.userPostsChanged.subscribe(
        (posts: Post[]) => {
          this.posts = posts;
          console.log(posts);
        }
      );
    }

  }

  ngOnDestroy() {
    if (this.myPostsChangedSubscription) {
      this.myPostsChangedSubscription.unsubscribe();
    }
  }

}
