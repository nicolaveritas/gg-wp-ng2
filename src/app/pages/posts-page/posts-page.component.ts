import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Http } from "@angular/http";
import { GetPostsService } from "app/services/get-posts";
import { FooterService } from "../../services/footer.service";

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
  isNewsPage;

  images;
  audio;
  isFullScreen = false;
  
  constructor(private route: ActivatedRoute, private http: Http, private router: Router, private footerService: FooterService) { }

  ngOnInit() {
    this.isNewsPage = this.router.url === '/home' ? true : false;
    this.service = new GetPostsService(this.http)
    this.service.init(this.route.snapshot.data['slug'])
    this.service.posts$.subscribe(res => this.posts = this.posts.concat(res))
    this.service.hasMore$.subscribe(b => this.hasMore = b)
  }

  loadMore() {
    this.service.getNextPosts();
  }

  handleFullScreenRequest(data) {
    console.log(data)
    this.footerService.showFooter$.next(false)
    this.isFullScreen = true;
    this.images = data.images;
    this.audio = data.audio;
  }

  backToGallery() {
    this.footerService.showFooter$.next(true)
    this.isFullScreen = false;
  }

}
