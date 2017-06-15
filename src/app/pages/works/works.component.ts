import { Component, OnInit } from '@angular/core';
import { Page } from "../../model/page";
import { PagesService } from "../../services/pages.service";
import { PostsService } from "../../services/posts.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {

  page: Page;

  posts;

  constructor(private pagesService: PagesService, 
              private postsService: PostsService) {

    // this.pagesService.works.filter(res => res !== null).subscribe(p => {
    //   this.page = p[0]; 
    // });

    this.postsService.works.filter(res => res != null).subscribe(p => {
      this.posts = p;
    })
  }

  ngOnInit() {
  }


}