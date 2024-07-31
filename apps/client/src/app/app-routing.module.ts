import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guards/user-guard/user.guard';


// const redirectToLogin = () => redirectUnauthorizedTo(['login']);

const appRoutes: Routes = [
  {
    path: 'bookstore',
    loadChildren: () =>
      import('./book-store/book-store.module').then((m) => m.BookStoreModule),
    canActivate: [UserGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
