import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {Item} from "../item.model";
import {Post, Comment} from "../post.model";
import {User, UserGrosso} from "../user.model";
import {NgForm} from "@angular/forms";
import {ServerService} from "../server.service";
import {Subscribable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {DataService} from "../data.service";

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit, OnDestroy {
  items: Item[];
  users: User[];
  posts: Post[];
  ready: boolean;

  postsChangedSubscription: Subscription;

  constructor(private userService: UserService,
              private router: Router,
              private serverService: ServerService,
              private dataService: DataService) { }

  ngOnInit() {
     if (!this.userService.user) {
       this.router.navigate(['/login']);
     }

    // this.items = [
    //   new Item(
    //     0,
    //     'Modenese fa la cacca in giardino',
    //     'Si chiama Stefano Allegretti',
    //     'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/15895291_699442833593939_6554684078952107603_n.jpg?oh=b9109de19cbcd1f8fcb08a944bf25a01&oe=5AA91265',
    //     'nessuno',
    //     new Date().toString(),
    //     'entertainment'
    //   ),
    //   new Item(
    //     1,
    //     'Sancataldese fa la cacca sul tetto',
    //     'Si chiama Fabbio Manganaro',
    //     'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/21761591_10210306848329563_359549035809606769_n.jpg?oh=5b29ae33ac376efacc9b2cb619073aea&oe=5A67874D',
    //     'nessuno',
    //     new Date().toString(),
    //     'sport'
    //   ), new Item(
    //     2,
    //     'Palermitano fa la cacca sul cancello',
    //     'Si chiama Marco Cipriano',
    //     'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/21369551_604151943306354_1333951150407067035_n.jpg?oh=46da2041c8ae8c254c5c22ea515a6461&oe=5A9D7383',
    //     'nessuno',
    //     new Date().toString(),
    //     'health'
    //   )
    // ];
    //
    // this.users = [
    //   new User(1, 'stefano', 'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/15895291_699442833593939_6554684078952107603_n.jpg?oh=b9109de19cbcd1f8fcb08a944bf25a01&oe=5AA91265'),
    //   new User(2, 'fabio', 'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/21761591_10210306848329563_359549035809606769_n.jpg?oh=5b29ae33ac376efacc9b2cb619073aea&oe=5A67874D'),
    //   new User(3, 'marco', 'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/21369551_604151943306354_1333951150407067035_n.jpg?oh=46da2041c8ae8c254c5c22ea515a6461&oe=5A9D7383'),
    //   new User(4, 'nicola', 'https://scontent-mxp1-1.xx.fbcdn.net/v/t31.0-8/10631296_1383645911928116_1801022395856691447_o.jpg?oh=2d105f05971a5b7c5e640bdac1c77ee1&oe=5A9BE5BE')
    // ];
    //
    // this.posts = [
    //   new Post(
    //     1,
    //     this.users[0],
    //     this.items[0],
    //     'kaffèèèèèè',
    //     [
    //       new Comment(this.users[0], 'ah sì un bel caffè per me, grazie', new Date()),
    //       new Comment(this.users[1], 'no, non mi piace', new Date()),
    //       new Comment(this.users[3], 'buongiornissimo anche a te', new Date())
    //     ],
    //     [],
    //     [],
    //     false
    //   ),
    //   new Post(
    //     2,
    //     this.users[2],
    //     this.items[1],
    //     'a 100 commenti nuovo video',
    //     [],
    //     [],
    //     [],
    //     false
    //   ),
    //   new Post(
    //     3,
    //     this.users[1],
    //     this.items[2],
    //     'incredibile!! guardate che roba',
    //     [
    //       new Comment(this.users[2], 'che storia non l\'avrei mai detto', new Date()),
    //       new Comment(this.users[1], 'sembrava un bravo ragazzo', new Date()),
    //     ],
    //     [
    //       this.users[1],
    //       this.users[3]
    //     ],
    //     [],
    //     false
    //   )
    // ];

    this.ready = false;

    this.serverService.fetchPosts();
    this.postsChangedSubscription = this.dataService.postsChanged.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
        console.log(posts);
        this.ready = true;
      }
    );

  }

  onSubmit(f: NgForm, post: Post) {
    if (f.value['comment']) {
      post.comments.push(new Comment(this.userService.user, f.value['comment'], new Date()));
      f.reset();
      this.serverService.storePost(post);  // da provare
    }
  }

  onLike(post: Post) {
    if (!post.likes.find(x => x === this.userService.user.id)) {
      post.likes.push(this.userService.user.id);
      post.liked = true;
      this.serverService.storePost(post);  // da provare
    }
  }

  ngOnDestroy() {
    this.postsChangedSubscription.unsubscribe();
  }

}
