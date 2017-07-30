  import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { environment } from "environments/environment";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import { Page } from '../model/page';

@Injectable()
export class PagesService {

  pages: Page[];
  news: BehaviorSubject<Page> = new BehaviorSubject<Page>(null);
  works: BehaviorSubject<Page> = new BehaviorSubject<Page>(null);
  biography: BehaviorSubject<Page> = new BehaviorSubject<Page>(null);
  contacts: BehaviorSubject<Page> = new BehaviorSubject<Page>(null);

  constructor(private http: Http) { }

  getPages() {
    this.http.get(`${environment.base_path_prod}/pages`)
      .map(res => res.json())
      //.do(res => console.log(res))
      .do(res => this.pushPages$(res))
      .subscribe(
        res => this.pages = res,
        err => {
          this.http.get(`${environment.base_path_dev}/pages`)
            .map(res => res.json())
            .do(res => this.pushPages$(res))
            .subscribe(res => this.pages = res)
        }
      );
  }

  pushPages$(res) {
    this.news.next(res.filter(res => res.title.rendered === "News"));
    this.works.next(res.filter(res => res.title.rendered === "Works"));
    this.biography.next(res.filter(res => res.title.rendered === "Biography"));
    this.contacts.next(res.filter(res => res.title.rendered === "Contacts"));
  }

}
