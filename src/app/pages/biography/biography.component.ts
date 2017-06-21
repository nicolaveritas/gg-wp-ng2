import { Component, OnInit } from '@angular/core';
import { Page } from "../../model/page";
import { PagesService } from "../../services/pages.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.css']
})
export class BiographyComponent implements OnInit {

  page: Page;
  content;

  constructor(private pages: PagesService, private sanitizer: DomSanitizer) {
    this.pages.biography.filter(res => res !== null).subscribe(p => {
      this.page = p[0]; 
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.page.content.rendered);
    });
  }

  ngOnInit() {
  }

}
