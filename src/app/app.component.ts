import { Component } from '@angular/core';
import { PagesService } from "./services/pages.service";
import { Page } from "./model/Page";
import { PostsService } from "./services/posts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public pagesService: PagesService, private postsService: PostsService) {
    this.pagesService.getPages();
    this.postsService.getPosts();
  }
}