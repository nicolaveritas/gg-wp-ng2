import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { environment } from "environments/environment";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import { Page } from '../model/page';

@Injectable()
export class PostsService {

  posts: any[];
  news: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  works: BehaviorSubject<any> = new BehaviorSubject<Page>(null);

  constructor(private http: Http) { }

  getPosts() {

    let username : string = 'g53eu38l5cf';
    let password : string = 'tovrakinmi22';
    let authHeaders = new Headers();
    authHeaders.append("Authorization", "Basic " + btoa(username + ":" + password)); 
    authHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    this.http.get(`${environment.base_path}/categories`, )
      .map(res => res.json())
      .subscribe((res: any[]) => {
        var newsId = res.filter(e => e.slug === 'news')[0].id;
        var worksId = res.filter(e => e.slug === 'works')[0].id;

        this.http.get(`${environment.base_path}/posts`)
          .map(res => res.json())
          .do(res => {
            this.news.next(res.filter(res => res.categories.includes(newsId)));
            this.works.next(res.filter(res => res.categories.includes(worksId)));
          })
          .subscribe(res => this.posts = res);

      })

  }

}
