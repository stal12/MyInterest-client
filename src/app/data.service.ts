import {Post} from "./post.model";
import {Item} from "./item.model";
import {Subject} from "rxjs/Subject";
import {Injectable} from "@angular/core";
import {ServerService} from "./server.service";
import {User, UserGrosso} from "./user.model";
import {UserService} from "./user.service";

@Injectable()
export class DataService {
  private items: Item[];
  private posts: Post[];
  private userPosts: Post[];
  private friends: User[];
  private pendingFriends: User[];
  private user: UserGrosso;
  private users: User[];

  itemsChanged = new Subject<Item[]>();
  postsChanged = new Subject<Post[]>();
  userPostsChanged = new Subject<Post[]>();
  friendsChanged = new Subject<User[]>();
  pendingFriendsChanged = new Subject<User[]>();
  userChanged = new Subject<User>();
  usersChanged = new Subject<User[]>();

  constructor(private userService: UserService) {}

  getItems() {
    return this.items.slice();
  }

  getPosts() {
    return this.posts.slice();
  }

  getUserPosts() {
    return this.userPosts.slice();
  }

  getFriends() {
    return this.friends.slice();
  }

  getPendingFriends() {
    return this.pendingFriends.slice();
  }

  getUser() {
    return this.user;
  }

  getUsers() {
    return this.users.slice();
  }

  setItems(items: Item[]) {
    this.items = items;
    this.itemsChanged.next(this.getItems());
  }

  setPosts(posts: Post[]) {
    for (const post of posts) {
      if (post.likes.includes(this.userService.user.id)) {
        post.liked = true;
      }
    }
    this.posts = posts;
    this.postsChanged.next(this.getPosts());
  }

  setUserPosts(userPosts: Post[]) {
    for (const post of userPosts) {
      if (post.likes.includes(this.userService.user.id)) {
        post.liked = true;
      }
    }
    this.userPosts = userPosts;
    this.userPostsChanged.next(this.getUserPosts());
  }

  setFriends(friends: User[]) {
    this.friends = friends;
    this.friendsChanged.next(this.getFriends());
  }

  setPendingFriends(pendingFriends: User[]) {
    this.pendingFriends = pendingFriends;
    this.pendingFriendsChanged.next(this.getPendingFriends());
  }

  setUser(user: UserGrosso) {
    this.user = user;
    this.userChanged.next(this.getUser());
  }

  setUsers(users: User[]) {
    this.users = users;
    this.usersChanged.next(this.getUsers());
  }

}
