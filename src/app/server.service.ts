import {Http, RequestOptions, Response, Headers} from '@angular/http';
import {Injectable, NgZone} from '@angular/core';
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {AuthService} from "angular2-social-login";
import {isUndefined} from "util";
import {Error} from "tslint/lib/error";
import {User, UserGrosso} from "./user.model";
import {Post} from "./post.model";
import {DataService} from "./data.service";

@Injectable()
export class ServerService {
  serverHost = 'http://localhost:8000/';


  constructor (private http: Http,
               private userService: UserService,
               private router: Router,
               private auth: AuthService,
               private ngZone: NgZone,
               private dataService: DataService) {}

  basicLogin(credentials: {email: string, password: string}) {
    this.http.post(this.serverHost + 'login/', credentials).subscribe(
      (response: Response) => {
        console.log(response);
        localStorage.setItem('JWT', response.json()['token']);
        const user = null;
        // = new UserGrosso();
        user.id = response.json()['id'];
        user.email = response.json()['email'];
        user.name = response.json()['name'];
        user.categories = response.json()['categories'];
        this.userService.setUser(user);
        this.router.navigate(['/']);
        return true;
      },
      (error: Error) => {
        console.log(error);
        return false;
      }
    );
  }

  facebookLogin() {

    console.log(this.auth.login('facebook'));
    this.auth.login('facebook').subscribe(
      (data) => {
        console.log(data);
        const email = data['email'];
        const token = data['token'];
        const image = data['image'];
        if (isUndefined(email) || isUndefined(token)) {
          return;
        } else {
          this.http.post(this.serverHost + 'facebook-login/', {email: email, token: token, image: image}).subscribe(
            (response: Response) => {
              const resObj = response.json();
              localStorage.setItem('JWT', response.json().token);
              // this.fetchUser();
              this.userService.createUserFromObj(response.json());
              localStorage.setItem('USER', this.userService.toJson());
              this.ngZone.run(() => { // non si sa perché, ma così funziona
                this.router.navigate(['/news']);
              });
              return true;
            },
            (error: Error) => {
              console.log(error);
              return false;
            }
          );
        }
      }
    );
  }

  facebookRegister() {
    this.auth.login('facebook').subscribe(
      (data) => {
        console.log(data);
        const email = data['email'];
        const token = data['token'];
        const name = data['name'];
        const image = data['image'];
        if (isUndefined(email) || isUndefined(token) || isUndefined(image) || isUndefined(name)) {
          return;
        } else {
          this.http.post(this.serverHost + 'facebook-register/', {email: email, token: token, name: name, image: image}).subscribe(
            (response: Response) => {
              console.log(response);
              const resObj = response.json();
              localStorage.setItem('JWT', response.json().token);
              // this.fetchUser();
              this.userService.createUserFromObj(response.json());
              localStorage.setItem('USER', this.userService.toJson());
              this.ngZone.run(() => { // non si sa perché, ma così funziona
                this.router.navigate(response.json()['created'] ? ['/register/categories'] : ['/news']);
              });
              // this.router.navigate(['/news']);
              return true;
            },
            (error: Error) => {
              console.log(error);
              return false;
            }
          );
        }
      }
    );
  }

  fetchUser() {
    const token = localStorage.getItem('JWT');
    if (token == null) {
      this.router.navigate(['/login']);
    } else {
      const headers = new Headers();
      headers.append('Authorization', token);
      const options = new RequestOptions({headers: headers});
      this.http.get(this.serverHost + 'fetch-user/', options).subscribe(
        (response: Response) => {
          console.log(response.json());
          this.userService.createUserFromObj(response.json());
          console.log(this.userService.toJson());
          localStorage.setItem('USER', this.userService.toJson());
          this.router.navigate(['/news']);
        }, (error: Error) => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      );
    }
  }

  registerUser(userData: {firstName: string, lastName: string, email: string, password: string, confirmPassword: string}) {
    this.http.post(this.serverHost + 'register-user/', userData).subscribe(
      (response: Response) => {
        console.log(response);
        if ('error' in response.json()) {
          return false;
        } else {
          localStorage.setItem('JWT', response.json().token);
          // si potrebbe (andare tutti quanti allo zoo comunale) ottenere l'ID dal token, ma non dovrebbe servire
          const user = null;
            // new UserGrosso();
          user.firstName = userData.firstName;
          user.lastName = userData.lastName;
          user.email = userData.email;
          this.userService.setUser(user);
          this.router.navigate(['/register/categories']);
          return true;
        }
      }, (error: Error) => {
        console.log(error);
        this.router.navigate(['/login']);
        return false;
      }
    );
  }

  registerCategories(categories: string[], navigateTo: string) {
    const token = localStorage.getItem('JWT');
    if (token == null) {
      this.router.navigate([navigateTo]);
    } else {
      const headers = new Headers();
      headers.append('Authorization', token);
      const options = new RequestOptions({headers: headers});
      this.http.post(this.serverHost + 'register-categories/', {categories: categories}, options).subscribe(
        (response: Response) => {
          console.log(response);
          this.userService.user.categories = categories;
          this.router.navigate([navigateTo]);
        }, (error: Error) => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      );
    }
  }

  storePost(post: Post) {  // implementare lato server
    const token = localStorage.getItem('JWT');
    if (token == null) {
      this.router.navigate(['/']);
    } else {
      const headers = new Headers();
      headers.append('Authorization', token);
      const options = new RequestOptions({headers: headers});

      const postino = {itemid: post.item.id, title: post.title}

      this.http.post(this.serverHost + 'store-post/', {post: postino}, options).subscribe(
        (response: Response) => {
          console.log(response);
        }, (error: Error) => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      );
    }
  }

  fetchItems() {
    const token = localStorage.getItem('JWT');
    if (token == null) {
      this.router.navigate(['/']);
    } else {
      const headers = new Headers();
      headers.append('Authorization', token);
      const options = new RequestOptions({headers: headers});
      this.http.get(this.serverHost + 'fetch-items/', options).subscribe(
        (response: Response) => {
          console.log(response);
          const items = response.json();  // e se il json è fatto a cazzo?
          this.dataService.setItems(items);
        }, (error: Error) => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      );
    }
  }

  fetchPosts() {
    const token = localStorage.getItem('JWT');
    if (token == null) {
      this.router.navigate(['/']);
    } else {
      const headers = new Headers();
      headers.append('Authorization', token);
      const options = new RequestOptions({headers: headers});
      this.http.get(this.serverHost + 'fetch-posts/', options).subscribe(
        (response: Response) => {
          console.log(response);
          const posts = response.json();  // e se il json è fatto a cazzo?
          this.dataService.setPosts(posts);
        }, (error: Error) => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      );
    }
  }

  fetchUserPosts(userid: number) {
    const token = localStorage.getItem('JWT');
    if (token == null) {
      this.router.navigate(['/']);
    } else {
      const headers = new Headers();
      headers.append('Authorization', token);
      const options = new RequestOptions({headers: headers});
      this.http.post(this.serverHost + 'fetch-user-posts/', {userid: userid}, options).subscribe(
        (response: Response) => {
          console.log(response);
          const userPosts = response.json();  // e se il json è fatto a cazzo?
          this.dataService.setUserPosts(userPosts);
        }, (error: Error) => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      );
    }
  }

  fetchFriends(userid: number) {
    const token = localStorage.getItem('JWT');
    if (token == null) {
      this.router.navigate(['/']);
    } else {
      const headers = new Headers();
      headers.append('Authorization', token);
      const options = new RequestOptions({headers: headers});
      this.http.post(this.serverHost + 'fetch-friends/', {userid: userid}, options).subscribe(
        (response: Response) => {
          console.log(response);
          const friends = <User[]> response.json();  // e se il json è fatto a cazzo?
          this.dataService.setFriends(friends);
        }, (error: Error) => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      );
    }
  }

  fetchPerson(userid: number) {
    const token = localStorage.getItem('JWT');
    if (token == null) {
      this.router.navigate(['/']);
    } else {
      const headers = new Headers();
      headers.append('Authorization', token);
      const options = new RequestOptions({headers: headers});
      this.http.post(this.serverHost + 'fetch-person/', {userid: userid}, options).subscribe(
        (response: Response) => {
          console.log(response);
          const user = <UserGrosso> response.json();  // e se il json è fatto a cazzo?
          this.dataService.setUser(user);
        }, (error: Error) => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      );
    }
  }

  deleteFriend(userid: number) {
    const token = localStorage.getItem('JWT');
    if (token == null) {
      this.router.navigate(['/']);
    } else {
      const headers = new Headers();
      headers.append('Authorization', token);
      const options = new RequestOptions({headers: headers});
      this.http.post(this.serverHost + 'delete-friend/', {userid: userid}, options).subscribe(
        (response: Response) => {
          console.log(response);
        }, (error: Error) => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      );
    }
  }

  requestFriend(userid: number) {
    const token = localStorage.getItem('JWT');
    if (token == null) {
      this.router.navigate(['/']);
    } else {
      const headers = new Headers();
      headers.append('Authorization', token);
      const options = new RequestOptions({headers: headers});
      this.http.post(this.serverHost + 'request-friend/', {userid: userid}, options).subscribe(
        (response: Response) => {
          console.log(response);
        }, (error: Error) => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      );
    }
  }

  acceptFriend(userid: number) {
    const token = localStorage.getItem('JWT');
    if (token == null) {
      this.router.navigate(['/']);
    } else {
      const headers = new Headers();
      headers.append('Authorization', token);
      const options = new RequestOptions({headers: headers});
      this.http.post(this.serverHost + 'accept-friend/', {userid: userid}, options).subscribe(
        (response: Response) => {
          console.log(response);
        }, (error: Error) => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      );
    }
  }

  cancelFriend(userid: number) {
    const token = localStorage.getItem('JWT');
    if (token == null) {
      this.router.navigate(['/']);
    } else {
      const headers = new Headers();
      headers.append('Authorization', token);
      const options = new RequestOptions({headers: headers});
      this.http.post(this.serverHost + 'cancel-friend/', {userid: userid}, options).subscribe(
        (response: Response) => {
          console.log(response);
        }, (error: Error) => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      );
    }
  }

  fetchPendingFriends() {
    const token = localStorage.getItem('JWT');
    if (token == null) {
      this.router.navigate(['/']);
    } else {
      const headers = new Headers();
      headers.append('Authorization', token);
      const options = new RequestOptions({headers: headers});
      this.http.get(this.serverHost + 'fetch-pending-friends/', options).subscribe(
        (response: Response) => {
          console.log(response);
          const pendingFriends = <User[]> response.json();  // e se il json è fatto a cazzo?
          this.dataService.setPendingFriends(pendingFriends);
        }, (error: Error) => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      );
    }
  }

  storeComment(postid: number, comment: string) {
    const token = localStorage.getItem('JWT');
    if (token == null) {
      this.router.navigate(['/']);
    } else {
      const headers = new Headers();
      headers.append('Authorization', token);
      const options = new RequestOptions({headers: headers});
      this.http.post(this.serverHost + 'store-comment/', {postid: postid, text: comment}, options).subscribe(
        (response: Response) => {
          console.log(response);
        }, (error: Error) => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      );
    }
  }

  storeLike(postid: number) {
    const token = localStorage.getItem('JWT');
    if (token == null) {
      this.router.navigate(['/']);
    } else {
      const headers = new Headers();
      headers.append('Authorization', token);
      const options = new RequestOptions({headers: headers});
      this.http.post(this.serverHost + 'store-like/', {postid: postid}, options).subscribe(
        (response: Response) => {
          console.log(response);
        }, (error: Error) => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      );
    }
  }

  fetchUsers() {
    const token = localStorage.getItem('JWT');
    if (token == null) {
      this.router.navigate(['/']);
    } else {
      const headers = new Headers();
      headers.append('Authorization', token);
      const options = new RequestOptions({headers: headers});
      this.http.get(this.serverHost + 'fetch-users/', options).subscribe(
        (response: Response) => {
          const users = <User[]> response.json();
          this.dataService.setUsers(users);
          console.log(response);
        }, (error: Error) => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      );
    }
  }
}
