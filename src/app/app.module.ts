import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BiographyComponent } from './pages/biography/biography.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { PagesService } from './services/pages.service';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CarouselModule, AccordionModule } from 'ngx-bootstrap';
import { PostComponent } from './components/post/post.component';
import { PostsPageComponent } from './pages/posts-page/posts-page.component';
import { StatementComponent } from './components/statement/statement.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BiographyComponent,
    ContactsComponent,
    PageNotFoundComponent,
    PostComponent,
    PostsPageComponent,
    StatementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    AccordionModule.forRoot()
  ],
  providers: [
    PagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
