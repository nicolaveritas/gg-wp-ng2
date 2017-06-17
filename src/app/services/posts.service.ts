import { Injectable } from '@angular/core';
import { Http, Headers, Jsonp, URLSearchParams } from "@angular/http";
import { environment } from "environments/environment";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import { Page } from '../model/page';
import { WpApiPosts } from "wp-api-angular/wp-api-angular";

@Injectable()
export class PostsService {

  posts: any[];
  news: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  works: BehaviorSubject<any> = new BehaviorSubject<Page>(null);

  constructor(private http: Http, private jsonp: Jsonp, private wpapi: WpApiPosts) { }

  getPosts() {
    this.http.get(`${environment.base_path}/categories`)
      .map(res => res.json())
      //.do(res => console.log(res))
      .subscribe((res: any[]) => {
        var news = res.filter(e => e.slug == 'news');
        var newsId = news.length > 0 ? news[0].id : null;
        var works = res.filter(e => e.slug == 'works');
        var worksId = works.length > 0 ? works[0].id : null;
        this.http.get(`${environment.base_path}/posts`)
          .map(res => res.json())
          //.do(res => console.log(res))
          .do(res => {
            this.news.next(res.filter(res => res.categories.includes(newsId)));
            this.works.next(res.filter(res => res.categories.includes(worksId)));
          })
          .subscribe(res => this.posts = res);
      })
  }
}
