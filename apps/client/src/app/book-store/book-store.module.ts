import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerBookComponent } from './banner-book/banner-book.component';
import { BookItemComponent } from './book-item/book-item.component';
import { BookStoreComponent } from './book-store.component';
import { BookDetailsDialogComponent } from './book-item/book-details-dialog/book-details-dialog.component';
import { BookStoreRoutingModule } from './book-store-routing.module';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderComponent } from '../header/header.component';
import { UserProfilePopupComponent } from '../nav-bar/user-profile-popup/user-profile-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../shared-module/shared.module';

@NgModule({
  declarations: [
    BannerBookComponent,
    BookItemComponent,
    BookDetailsDialogComponent,
    BookStoreComponent,
    HeaderComponent,
    NavBarComponent,
    UserProfilePopupComponent,
  ],
  imports: [
    CommonModule,
    BookStoreRoutingModule,
    RouterModule,
    MatSidenavModule,
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
    SharedModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class BookStoreModule { }
