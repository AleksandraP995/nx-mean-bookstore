import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../shared-module/truncate.pipe';
import { ClickOutsideDirective } from './click-outside.directive';
import { SignupComponent } from './signup/signup.component';
import { LoadingSpinnerComponent } from '../shared-module/loading-spinner/loading-spinner.component';
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
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { SharedRoutingModule } from './shared.routing.module';

@NgModule({
  declarations: [
    TruncatePipe,
    ClickOutsideDirective,
    SignupComponent,
    LoginComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    CommonModule,
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
    SharedRoutingModule
  ],
  exports: [
    TruncatePipe,
    ClickOutsideDirective,
    SignupComponent,
    LoginComponent,
    LoadingSpinnerComponent,
  ]
})
export class SharedModule {}

