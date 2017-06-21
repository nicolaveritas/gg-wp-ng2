import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Http } from "@angular/http";
import { GetPostsService } from "app/services/get-posts";

@Component({
  selector: 'app-post-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.css']
})
export class PostsPageComponent implements OnInit {

  slug: string;
  posts = [];
  hasMore = false;
  service: GetPostsService;
  isNewsPage
  
  constructor(private route: ActivatedRoute, private http: Http, private router: Router) { }

  ngOnInit() {

    this.isNewsPage = this.router.url === '/news' ? true : false;
    
    this.service = new GetPostsService(this.http)

    this.service.init(this.route.snapshot.data['slug'])

    this.service.posts$.subscribe(res => {
      this.posts = this.posts.concat(res)
    })

    this.service.hasMore$.subscribe(b => {
      this.hasMore = b
    })
    
  }

  loadMore() {
    this.service.getNextPosts();
  }

}
