import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloComponentComponent } from './hello-component/hello-component.component';
import { NewUserDialogComponent } from './users-list/new-user-dialog/new-user-dialog.component';
import { RemoveDialogComponent } from './users-list/remove-user-dialog/remove-dialog.component';
import { SharedModule } from '../shared-module/shared.module';
import { UserCardComponent } from './users-list/user-card/user-card.component';
import { UsersListComponent } from './users-list/users-list.component';
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
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    HelloComponentComponent,
    NewUserDialogComponent,
    RemoveDialogComponent,
    UserCardComponent,
    UsersListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSidenavModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
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
    UsersRoutingModule
  ],
  exports: [
    HelloComponentComponent,
    NewUserDialogComponent,
    RemoveDialogComponent,
    UserCardComponent,
    UsersListComponent,
  ]
})
export class UsersModule { }
