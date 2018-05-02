import {Component, Input, OnInit} from '@angular/core';
import {Post, Comment} from "../post.model";
import {UserService} from "../user.service";
import {NgForm} from "@angular/forms";
import {ServerService} from "../server.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @Input() posts: Post[];

  constructor(private userService: UserService,
              private serverService: ServerService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm, post: Post) {
    if (f.value['comment']) {
      const comment = new Comment(this.userService.user, f.value['comment'], new Date());
      post.comments.push(comment);
      f.reset();
      this.serverService.storeComment(post.postid, comment.text);
    }
  }

  onLike(post: Post) {
    if (!post.liked) {
      post.likes.push(this.userService.user.id);
      post.liked = true;
    } else {
      post.likes.pop();
      post.liked = false;
    }
    this.serverService.storeLike(post.postid);
  }

}
