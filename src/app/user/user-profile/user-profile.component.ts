import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Item} from '../../item.model';
import {User, UserGrosso} from '../../user.model';
import {Post, Comment} from '../../post.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../../user.service';
import {ServerService} from "../../server.service";
import {DataService} from "../../data.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  // @Input() id: number;
  @Input() user: UserGrosso;
  items: Item[];
  posts: Post[];
  users: User[];
  ready: boolean;

  userPostsChangedSubscription: Subscription;
  userChangedSubscription: Subscription;


  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private serverService: ServerService,
              private dataService: DataService) { }

  ngOnInit() {
    // console.log(this.id);

    this.posts = [];
    this.ready = false;
/*
    this.items = [
      new Item(
        0,
        'Modenese fa la cacca in giardino',
        'Si chiama Stefano Allegretti',
        'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/15895291_699442833593939_6554684078952107603_n.jpg?oh=b9109de19cbcd1f8fcb08a944bf25a01&oe=5AA91265',
        'nessuno',
        new Date().toString(),
        'entertainment'
      ),
      new Item(
        1,
        'Sancataldese fa la cacca sul tetto',
        'Si chiama Fabbio Manganaro',
        'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/21761591_10210306848329563_359549035809606769_n.jpg?oh=5b29ae33ac376efacc9b2cb619073aea&oe=5A67874D',
        'nessuno',
        new Date().toString(),
        'sport'
      ), new Item(
        3,
        'Palermitano fa la cacca sul cancello',
        'Si chiama Marco Cipriano',
        'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/21369551_604151943306354_1333951150407067035_n.jpg?oh=46da2041c8ae8c254c5c22ea515a6461&oe=5A9D7383',
        'nessuno',
        new Date().toString(),
        'health'
      )
    ];

    this.users = [
      new User(1, 'stefano', 'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/15895291_699442833593939_6554684078952107603_n.jpg?oh=b9109de19cbcd1f8fcb08a944bf25a01&oe=5AA91265'),
      new User(2, 'fabio', 'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/21761591_10210306848329563_359549035809606769_n.jpg?oh=5b29ae33ac376efacc9b2cb619073aea&oe=5A67874D'),
      new User(3, 'marco', 'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/21369551_604151943306354_1333951150407067035_n.jpg?oh=46da2041c8ae8c254c5c22ea515a6461&oe=5A9D7383'),
      new User(4, 'nicola', 'https://scontent-mxp1-1.xx.fbcdn.net/v/t31.0-8/10631296_1383645911928116_1801022395856691447_o.jpg?oh=2d105f05971a5b7c5e640bdac1c77ee1&oe=5A9BE5BE')
    ];

    this.user = this.users[0];

    this.posts = [
      new Post(
        1,
        this.user,
        this.items[0],
        'kaffèèèèèè',
        [
          new Comment(this.users[1], 'ah sì un bel caffè per me, grazie', new Date()),
          new Comment(this.users[2], 'no, non mi piace', new Date()),
          new Comment(this.users[3], 'buongiornissimo anche a te', new Date())
        ],
        [],
        [],
        false,
        new Date()
      ),
      new Post(
        2,
        this.user,
        this.items[1],
        'a 100 commenti nuovo video',
        [],
        [],
        [],
        false,
        new Date()
      ),
      new Post(
        3,
        this.user,
        this.items[2],
        'incredibile!! guardate che roba',
        [],
        [],
        [],
        false,
        new Date()
      )
    ];*/


    console.log('entrato' + this.user.name );

    /*this.serverService.fetchPerson(this.user.id)
    this.userChangedSubscription = this.dataService.userChanged.subscribe(
      (user: UserGrosso) => {
        this.user = user;
        console.log(user);
      }
    );*/


    this.serverService.fetchUserPosts(this.user.id);
    this.userPostsChangedSubscription = this.dataService.userPostsChanged.subscribe(
      (posts: Post[]) => {
       // ma certo fabbio non ha un cazzo di post
        this.posts = posts;

        // this.user = posts[0].user;
        this.ready = true;
      }
    );
  }

  onShowUserAndId() {
    console.log(this.user);
    // console.log(this.id);
  }
  ngOnDestroy() {

    this.userPostsChangedSubscription.unsubscribe();
    // this.userChangedSubscription.unsubscribe();
  }

}
