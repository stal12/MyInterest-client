import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Item} from '../item.model';
import {DataService} from "../data.service";
import {ServerService} from "../server.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {
  category = 'all';
  page = 1;
  perPage = 10;
  itemsChangedSubscription: Subscription;
  items = [];
  displayedItems = [];
  ready: boolean;

  constructor(protected userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService,
              private serverService: ServerService) { }

  ngOnInit() {
    console.log('init');
    this.ready = false;
    if (!this.userService.user) {
      console.log('Nessun utente, dunque navigo al login');
      this.router.navigate(['/login']);
    } else {

      console.log(this.userService.user);
      for (let i = 0; i < 5; i++) {
        this.items.push(...this.items);
        Math.ceil(10);
      }

      this.route.params.subscribe(
        (params: Params) => {
          console.log(this.userService.user);
          this.category = params['category'];
          if (!this.category) {
            this.category = 'all';
          }
          this.filterCategory();

          this.page = +params['page'];
          if (!this.page) {
            this.page = 1;
          }
          console.log(this.page);
          console.log(this.items);
          console.log(this.range((this.page - 1) * this.perPage, (this.page - 1) * this.perPage + this.perPage, 2));
        }
      );

      this.serverService.fetchItems();
      this.itemsChangedSubscription = this.dataService.itemsChanged.subscribe(
        (items: Item[]) => {
          this.items = items;
          console.log(items);
          this.filterCategory();
          this.ready = true;
        }
      );
    }

  }

  // private range(from: number, size: number) {
  //   return Array.apply(null, {length: size}).map(function(value, index) {
  //     return index + from;
  //   });
  // }

  private range(start, stop, step) {
    if (typeof stop === 'undefined') {
      // one param defined
      stop = start;
      start = 0;
    }

    if (typeof step === 'undefined') {
      step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
      return [];
    }

    const result = [];
    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
      result.push(i);
    }

    return result;
  }

  private ceil(x: number) {
    return Math.ceil(x);
  }

  private filterCategory() {
    if (this.category === 'all') {
      this.displayedItems = this.items.slice();
      return;
    } else {
      this.displayedItems = [];
      if (!this.items) {
        return;
      } else {
        for (const item of this.items) {
          if (item.category === this.category) {
            this.displayedItems.push(item);
          }
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.itemsChangedSubscription) {
      this.itemsChangedSubscription.unsubscribe();
    }
  }

}

