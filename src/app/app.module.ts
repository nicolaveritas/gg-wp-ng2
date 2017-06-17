import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, Http } from '@angular/http';
import { WpApiModule, WpApiLoader, WpApiStaticLoader } from "wp-api-angular";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewsComponent } from './pages/news/news.component';
import { WorksComponent } from './pages/works/works.component';
import { BiographyComponent } from './pages/biography/biography.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { PagesService } from './services/pages.service';
import { PostsService } from "./services/posts.service";
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CarouselModule, AccordionModule } from 'ngx-bootstrap';
import { PostComponent } from './components/post/post.component';

export function WpApiLoaderFactory(http: Http) {
  //return new WpApiStaticLoader(http, 'http://YOUR_DOMAIN/wp-json/', /* namespace is optional, default: '/wp/v2' */);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NewsComponent,
    WorksComponent,
    BiographyComponent,
    ContactsComponent,
    PageNotFoundComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    WpApiModule.forRoot({
      provide: WpApiLoader,
      useFactory: (WpApiLoaderFactory),
      deps: [Http]
    }),
    AppRoutingModule,
    CarouselModule.forRoot(),
    AccordionModule.forRoot()
  ],
  providers: [
    PagesService,
    PostsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
