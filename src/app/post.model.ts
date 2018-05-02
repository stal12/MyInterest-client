import {Item} from './item.model';
import {User} from './user.model';

export class Post {
  postid: number;
  user: User;
  item: Item;
  title: string;
  comments: Comment[];
  tags: User[];
  likes: number[];
  liked: boolean;
  date: Date;

  constructor(postid: number, user: User, item: Item, title: string, comments: Comment[], tags: User[], likes: number[], liked: boolean, date: Date) {
    this.postid = postid;
    this.user = user;
    this.item = item;
    this.title = title;
    this.comments = comments;
    this.tags = tags;
    this.likes = likes;
    this.liked = liked;
    this.date = date;
  }
}

export class Comment {
  user: User;
  text: string;
  date: Date;

  constructor(user: User, text: string, date: Date) {
    this.user = user;
    this.text = text;
    this.date = date;
  }
}
