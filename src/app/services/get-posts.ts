import { Http } from "@angular/http";
import { environment } from "environments/environment";
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

export class GetPostsService {
  
  id: any[];
  page = 0;
  numberOfPosts: number;
  numberOfPages: number;
  postsPerpage: number;
  hasMore$: Subject<boolean> = new Subject<boolean>();
  posts$: Subject<any> = new Subject<any>();

  constructor(private http: Http) { }

  init(slug: string, postsPerPage: number = 5) {
    this.postsPerpage = postsPerPage;
    this.http.get(`${environment.base_path_prod}/categories?slug=${slug}`)
      .map(res => res.json())
      .subscribe(
        res => this.parseCategories(res),
        err => {
          this.http.get(`${environment.base_path_dev}/categories?slug=${slug}`)
            .map(res => res.json())
            .subscribe(res => this.parseCategories(res))
        }
    )
  }

  getNextPosts() {
    this.page++;
    this.http.get(`${environment.base_path_dev}/posts?categories=${this.id}&per_page=5&page=${this.page}&orderby=date&order=desc`)
      .map(res => res.json())
      .subscribe(
        res => this.parseNextPosts(res),
        err => {
          this.http.get(`${environment.base_path_dev}/posts?categories=${this.id}&per_page=5&page=${this.page}&orderby=date&order=desc`)
            .map(res => res.json())
            .subscribe(res => this.parseNextPosts(res));
        })
  }

  parseCategories(res) {
    this.id = res[0].id;
    this.numberOfPosts = res[0].count;
    this.numberOfPages = this.numberOfPosts / 5
    this.getNextPosts()
  }

  parseNextPosts(res) {
    this.posts$.next(res)
    this.numberOfPages > this.page ? this.hasMore$.next(true) : this.hasMore$.next(false)
  }
}
