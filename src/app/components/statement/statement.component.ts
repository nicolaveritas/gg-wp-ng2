import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { GetPostsService } from "app/services/get-posts";
import * as Utils from "../../utils/parser"

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {

  service: GetPostsService;
  posts;

  constructor(private http: Http) {
    this.service = new GetPostsService(this.http)
    this.service.init('statement', 1);
    this.service.posts$.subscribe(res => this.posts = res);
  }

  ngOnInit() {
  }

}
