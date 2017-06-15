import { Component, OnInit } from '@angular/core';
import { PagesService } from "../../services/pages.service";
import { Page } from "../../model/page";
import { PostsService } from "../../services/posts.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  page: Page;
  content;

  posts;

  constructor(private pagesService: PagesService, private postsService: PostsService) {
    // this.pagesService.news.filter(res => res !== null).subscribe(p => {
    //   this.page = p[0]; 
    //   this.content = this.page.content.rendered; 
    // });

    this.postsService.news.filter(res => res != null).subscribe(p => {
      this.posts = p;
    })
  }

  ngOnInit() {
  }

}
