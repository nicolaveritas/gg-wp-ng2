export class Page {
    constructor(
        public id: number,
        public date: string,
        public guid: Guid,
        public modified: string,
        public modified_gmt: string,
        public slug: string,
        public status: string,
        public tyre: string,
        public link: string,
        public title: Title,
        public content: Content,
        public excerpt: Excerpt,
        public author: number,
        public featured_media: number,
        public parent: number,
        public menu_order: number,
        public comment_status: string,
        public ping_status: string,
        public template: string,
        public meta: any[],
        public links: Links
    ) {}
}

class Guid {
    constructor(
        public rendered: string
    ) {}
}

class Title {
    constructor(
        public rendered: string
    ) {}
}

class Content {
    constructor(
        public rendered: string,
        public rotected: string
    ) {}
}

class Excerpt extends Content {}

class Links {
    constructor(
        public self: Link[],
        public collection: Link[],
        public about: Link[],
        public author: Link[],
        public replies: Link[]
    ) {}
}

class Link {
    constructor(
        public href: string,
        public embeddable: boolean
    ) {}
}