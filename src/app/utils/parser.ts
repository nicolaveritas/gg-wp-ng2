import { CarouselImage } from "../model/image";

export function getTextContent(input: string) {
    var result;
    try {
        result = input.split('<p')
            .map(e => e.split('</p>'))
            .reduce((result, current) => result.concat(current))
            .map(e => e.split('<div'))
            .reduce((result, current) => result.concat(current))
            .map(e => e.split('</div>'))
            .reduce((result, current) => result.concat(current))
            .filter(e => !e.includes('.mp4') && !e.includes('.mov') && !e.includes('.ogg'))
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

export function getExcerpt(input: string): string[] {
    var result;
    try {
        result = input.replace("\u21b5", "").split('<p>')
            .map(e => e.split('</p>'))
            .reduce((result, current) => result.concat(current))
            .filter(e => e && e !== '\n')
            .filter(e => e.substring(0, 22) !== '<p><div id="attachment')
            .filter(e => e.substring(0, 14) !== '<p></div>\n<div ')
            .reduce((result, current) => result.concat(current));
    } catch (e) {
        //console.log(`the post ${this.post.id} has no text content`)
    }
    return result;
}

export function getImagesUrl(input: string): CarouselImage[] {
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
        .map(e => e.split('<'))
        .reduce((result, current) => result.concat(current))
        .filter(e => e.indexOf('wp-caption-text') !== -1)
        .map(e => e = `<p ${e}</p>`)
    }
    catch (e) {
      //console.log('parse failure on captions')
    }
    
    try {
      urls.forEach((u, i) => result = result.concat({url: u, caption: captions[i] || null, type: 'image'}))
      result.forEach(i =>  i.caption = i.caption.split('>')[1].split('<')[0]);
    }
    catch(e) {
      //console.log(`the post ${this.post.id} has no images`)
    }
    return result;
  }

  export function GetImagesCaptions(input: string) {
      var result: string;

      try {
          result = '<p>' + input.split('<figcaption class="wp-caption-text">')[1].split('</figcaption>')[0] + '</p>';
      }
      catch(e) {
          //console.log(e)
      }

      return result;
  }

  export function getAudio(input: string) {
      var result;
      var start = input.indexOf('<audio');
      if (start > -1) {
          result = input.substring(start)
          var end = result.indexOf('</audio>')
          result = result.substring(0, end + 8)
      }
      return result;
  }

  export function getVideo(input) {
      var result;
      if (input.includes('.mp4') || input.includes('.mov') || input.includes('.ogg')) {
          result = input.split('<')
            .map(e => e.split('>'))
            .reduce((result, current) => result.concat(current))
            .filter(e => e.includes('.mp4') || e.includes('.mov') || e.includes('.ogg'))
            .map(e => e.substring(3))
            .map(e => e.substring(0, e.length - 1))
            .map(e => e = {url: e, caption: null, type: 'video'});
      }
      return result;
  }