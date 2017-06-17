import { Component, OnInit, Input } from '@angular/core';
import { CarouselImage } from "../../model/image";

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
  images: CarouselImage[];

  constructor() { }

  ngOnInit() {
    this.title = this.post.title.rendered;
    this.images = this.getImagesUrl(this.post.content.rendered)
    this.content = this.getTextContent(this.post.content.rendered);
    console.log(this.content)
    this.excerpt = this.getExcerpt(this.post.excerpt.rendered);
  }

  getTextContent(input: string) {
    var result;
    try {
      result = input.split('<p')
        .map(e => e.split('</p>'))
        .reduce((result, current) => result.concat(current))
        .map(e => e.split('<div'))
        .reduce((result, current) => result.concat(current))
        .map(e => e.split('</div>'))
        .reduce((result, current) => result.concat(current))
        .filter(e => e && e.substring(0, 16) !== ' id="attachment_')
        .filter(e => e.indexOf('wp-caption-text') === -1)
        .filter(e => e.indexOf('src="http') === -1)
        .map(e => e = `<p ${e}</p>`)
        .reduce((result, current) => result.concat(current))
    }
    catch (e) {
      //console.log('parse failure')
    }
    return result;
  }

  getExcerpt(input: string): string[] {
    var result;
    try {
      result = input.replace("\u21b5", "").split('<p>')
        .map(e => e.split('</p>'))
        .reduce((result, current) => result.concat(current))
        .filter(e => e && e !== '\n')
        //.map(e => '<p>' + e + '<p>')
        .filter(e => e.substring(0, 22) !== '<p><div id="attachment')
        .filter(e => e.substring(0, 14) !== '<p></div>\n<div ')
        .reduce((result, current) => result.concat(current));
    } catch (e) {
      //console.log(`the post ${this.post.id} has no text content`)
    }
    return result;
  }

  getImagesUrl(input: string): CarouselImage[] {
    var result: CarouselImage[] = [];
    var urls: string[];
    var captions: string[];
    try {
      urls = input.split('<')
        .filter(element => element.substring(0, 3) === 'img')
        .map(element => element.split(' '))
        .reduce((result, current) => result.concat(current))
        .filter(element => element.substring(0, 3) === 'src' && element.substring(0, 6) !== 'srcset')
        .map(srcs => srcs.split('"').slice(1).slice(0, 1))
        .reduce((result, current) => result.concat(current))

      //console.log(urls)
    } catch (e) {
      //console.log(`parse failure on url images`)
    }

    try {
      captions = input.split('<p')
        .map(e => e.split('</p>'))
        .reduce((result, current) => result.concat(current))
        .map(e => e.split('<div'))
        .reduce((result, current) => result.concat(current))
        .map(e => e.split('</div>'))
        .reduce((result, current) => result.concat(current))
        .filter(e => e && e.substring(0, 16) !== ' id="attachment_')
        .filter(e => e.indexOf('wp-caption-text') !== -1)
        .map(e => e = `<p ${e}</p>`)
      //console.log(captions)
    }
    catch (e) {
      //console.log('parse failure on captions')
    }
    
    try {
      urls.forEach((u, i) => result = result.concat({url: u, caption: captions[i] || null}))
    }
    catch(e) {
      //console.log(`the post ${this.post.id} has no images`)
    }
    return result;
  }


}
