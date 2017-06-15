import { Component, OnInit } from '@angular/core';
import { Page } from "../../model/page";
import { PagesService } from "../../services/pages.service";

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.css']
})
export class BiographyComponent implements OnInit {

  page: Page;
  content;

  constructor(private pages: PagesService) {
    this.pages.biography.filter(res => res !== null).subscribe(p => {
      this.page = p[0]; 
      this.content = this.page.content.rendered;
    });
  }

  ngOnInit() {
  }

}
