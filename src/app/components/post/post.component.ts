import { Component, OnInit, Input } from '@angular/core';
import { CarouselImage } from "../../model/image";
import * as Utils from "../../utils/parser"
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post;
  @Input() isStatement: boolean;  

  title;
  excerpt;
  content
  images: CarouselImage[];

  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit() {
    if (this.post.title.rendered == 'GIUSEPPINA (self-portrait)')
      console.log(this.post)

    this.title = this.post.title.rendered;
    this.images = Utils.getImagesUrl(this.post.content.rendered)
    this.content = this.sanitizer.bypassSecurityTrustHtml(Utils.getTextContent(this.post.content.rendered));
    this.excerpt = Utils.getExcerpt(this.post.excerpt.rendered);
  }
}
