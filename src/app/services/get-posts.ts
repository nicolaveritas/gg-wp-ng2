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
    this.http.get(`${environment.base_path}/categories?slug=${slug}`)
      .map(res => res.json())
      .subscribe(res => {
        this.id = res[0].id;
        this.numberOfPosts = res[0].count;
        this.numberOfPages = this.numberOfPosts / 5
        this.getNextPosts()
      })
  }

  getNextPosts() {
    this.page++;
    this.http.get(`${environment.base_path}/posts?categories=${this.id}&per_page=5&page=${this.page}&orderby=date&order=desc`)
      .map(res => res.json())
      .subscribe(res => {
        this.posts$.next(res)
        this.numberOfPages > this.page ? this.hasMore$.next(true) : this.hasMore$.next(false)
      })
  }
}
