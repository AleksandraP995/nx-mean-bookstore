import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookStoreComponent } from './book-store.component';

const routes: Routes = [
  { path: '', component: BookStoreComponent}
];

@NgModule({
  imports: [
   RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BookStoreRoutingModule { }
