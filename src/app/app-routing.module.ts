import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from "./pages/contacts/contacts.component";
import { BiographyComponent } from "./pages/biography/biography.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { PostsPageComponent } from "./pages/posts-page/posts-page.component";
import { FullScreenGalleryComponent } from "./components/full-screen-gallery/full-screen-gallery.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: PostsPageComponent,
    data: { slug: 'news' }
  },
  {
    path: 'works',
    component: PostsPageComponent,
    data: { slug: 'works' }
  },
  {
    path: 'biography',
    component: BiographyComponent
  },
  {
    path: 'contacts',
    component: ContactsComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
