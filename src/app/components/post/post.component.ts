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
  content;
  audio;
  videos;
  images: CarouselImage[];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.title = this.post.title.rendered;
    this.images = Utils.getImagesUrl(this.post.content.rendered)
    this.content = this.sanitizer.bypassSecurityTrustHtml(Utils.getTextContent(this.post.content.rendered));
    this.excerpt = Utils.getExcerpt(this.post.excerpt.rendered);
    this.audio = this.sanitizer.bypassSecurityTrustHtml(Utils.getAudio(this.post.content.rendered));

    var video = Utils.getVideo(this.post.content.rendered)
    if (video !== undefined) {
      var res = video.map(e => e = {url: this.sanitizer.bypassSecurityTrustUrl(e.url.substring(5)), type: e.type, caption: e.caption});
      console.log(res)

      this.images = this.images.concat(res)

      console.log(this.images)

      // this.images.forEach(i => console.log(i.url))
    }
    // console.log(video)

  }
}
