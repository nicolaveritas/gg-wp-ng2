import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CarouselImage } from "../../model/image";
import * as Utils from "../../utils/parser"
import { DomSanitizer } from "@angular/platform-browser";
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post;
  @Input() isStatement: boolean;

  @Output() requestFullScreen = new EventEmitter();

  title;
  excerpt;
  content;
  audio;
  videos;
  images: CarouselImage[];
  showIcon = true;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.title = this.post.title.rendered;
    this.images = Utils.getImagesUrl(this.post.content.rendered)
    this.content = this.sanitizer.bypassSecurityTrustHtml(Utils.getTextContent(this.post.content.rendered));
    if(this.content.changingThisBreaksApplicationSecurity === undefined)
      this.showIcon = false;
    
    this.excerpt = Utils.getExcerpt(this.post.excerpt.rendered);
    this.audio = this.sanitizer.bypassSecurityTrustHtml(Utils.getAudio(this.post.content.rendered));
    var video = Utils.getVideo(this.post.content.rendered)
    if (video !== undefined) {
      var res = video.map(e => e = {url: this.sanitizer.bypassSecurityTrustUrl(e.url.substring(5)), type: e.type, caption: e.caption});
      this.images = this.images.concat(res)
    }
  }

  goFullScreen(imgs, audio) {
    this.requestFullScreen.emit({images: imgs, audio: audio});
  }
}
