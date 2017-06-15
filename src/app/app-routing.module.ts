import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from "./pages/news/news.component";
import { ContactsComponent } from "./pages/contacts/contacts.component";
import { BiographyComponent } from "./pages/biography/biography.component";
import { WorksComponent } from "./pages/works/works.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";

const routes: Routes = [
  { 
    path: '',
    redirectTo: 'news',
    pathMatch: 'full'
  },
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'works',
    component: WorksComponent
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
