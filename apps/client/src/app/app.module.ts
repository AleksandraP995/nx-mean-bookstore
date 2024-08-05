import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthInterceptorService } from './authentication/interceptors/auth-interceptor.service';
import { PlaceHolderDirective } from './users/helloComponent/placeholder-directive';
import { ShoppingListModule } from '../app/shoppin-list/shopping-list.module';
import { SharedModule } from './shared-module/shared.module';
import { FavoritesModule } from './favorites/favorites.module';
import { BookStoreModule } from './book-store/book-store.module';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [AppComponent, PlaceHolderDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatStepperModule,
    MatButtonModule,
    MatCardModule,
    SharedModule,
    FavoritesModule,
    ShoppingListModule,
    BookStoreModule,
    UsersModule,
    CoreModule,
    BrowserAnimationsModule
  ],
  exports: [MatFormFieldModule, ShoppingListModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: MatDialogRef,
      useValue: {},
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LoginInterceptorService,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
