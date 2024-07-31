import { NgModule } from '@angular/core';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [
  { path: 'favorites', component: FavoritesListComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectToLogin } },
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FavoritesRoutingModule { }