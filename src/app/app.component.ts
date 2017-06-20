import { Component } from '@angular/core';
import { PagesService } from "./services/pages.service";
import { Page } from "./model/Page";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public pagesService: PagesService) {
    this.pagesService.getPages();
  }
}