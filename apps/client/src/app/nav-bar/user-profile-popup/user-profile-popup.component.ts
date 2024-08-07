import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/authService/auth.service';
import { BookstoreUser } from '@org-bookstore/app-configuration';

@Component({
  selector: 'app-user-profile-popup',
  templateUrl: './user-profile-popup.component.html',
  styleUrls: ['./user-profile-popup.component.scss'],
})
export class UserProfilePopupComponent implements OnInit {
  userSubscription: Subscription = new Subscription();
  userNameSubscription: Subscription = new Subscription();
  newUser: BookstoreUser | null = null;
  userName: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userSubscription = this.authService.userObservable$.subscribe((user) => {
      if(!user) {
        return;
      }
      this.newUser = user;
      this.userName = user.username ?? '';
    });
  }
  
  logout() {
    this.authService.logout();
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.userNameSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
