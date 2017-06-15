import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post;

  title;
  excerpt;
  content
  images;

  constructor() { }

  ngOnInit() {
    this.title = this.post.title.rendered;
    this.content = this.getTexContent(this.post.content.rendered);
    this.excerpt = this.getTexContent(this.post.excerpt.rendered);
    this.images = this.getImagesUrl(this.post.content.rendered)
  }

  getTexContent(input: string) {
    var result;
    try {
      result = input.split('<')
        .map(e => e.split('>'))
        .reduce((result, current) => result.concat(current))
        .map(e => e.trim())
        .filter(str => str &&
          str.substring(0, 1) !== 'p' &&
          str.substring(0, 2) !== '/p' &&
          str.substring(0, 3) !== 'img')
    } catch (e) {
      console.log(`the post ${this.post.id} has no text content`)
    }
    return result;
  }

  getImagesUrl(input: string): string[] {
    var result;
    try {
      result = input.split('<')
        .filter(element => element.substring(0, 3) === 'img')
        .map(element => element.split(' '))
        .reduce((result, current) => result.concat(current))
        .filter(element => element.substring(0, 3) === 'src' && element.substring(0, 6) !== 'srcset')
        .map(srcs => srcs.split('"').slice(1).slice(0, 1))
        .reduce((result, current) => result.concat(current))
    } catch (e) {
      console.log(`the post ${this.post.id} has no images`)
    }
    return result;
  }


}
