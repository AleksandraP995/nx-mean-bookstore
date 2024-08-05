import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  catchError,
  from,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { BookstoreUser } from '../../models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserCredentials } from '../../app/users/userEnums';
import { NotificationManagerService } from '../notificationManager/notification-manager.service';
import { HttpClient } from '@angular/common/http';
import { CreateNewUserObject } from '../../models/httpResponses';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly auth: AngularFireAuth,
    private readonly notificationManager: NotificationManagerService,
    private readonly http: HttpClient
  ) {}

  // isAdmin: boolean = false;

  userSubject = new BehaviorSubject<BookstoreUser | null>(null);
  userSubscription = new Subscription();

  private resetSubject = new BehaviorSubject<boolean>(false);
  errorSubject = new Subject<{ field: string; error: string | null }>();


  // provides current value directly and can be subscribed to for updates
  get userObservable$() {
    return this.userSubject.asObservable();
  }

  get resetSubjectObservable$() {
    return this.resetSubject.asObservable()
  }

  get errorObservable$() {
    return this.errorSubject.asObservable();
  }

  authenticate(userCredentials: UserCredentials): Observable<string> {
    return from(
      this.auth.signInWithEmailAndPassword(
        userCredentials.email,
        userCredentials.password
      )
    ).pipe(
      switchMap((userCredential) => userCredential.user?.getIdToken() ?? ''),
      catchError((error) => {
        console.error('Error authenticating user:', error);
        throw error;
      })
    );
  }

  verifyToken(token: string): Observable<any> {
    return this.http
      .post<any>(`${environment.settings.apiUrl}/api/verify-token`, { token })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          console.error('Error verifying token:', error);
          throw error;
        })
      );
  }

  autoLogin() {
    // debugger
    const userData: BookstoreUser = JSON.parse(
      localStorage.getItem('userData') as string
    );
    if (!userData) {
      return;
    }
    const loadedUser: BookstoreUser = {
      ...userData,
      tokenExpirationDate: new Date(userData.tokenExpirationDate),
    };
    // AKO token nije expired
    if (loadedUser.tokenExpirationDate > new Date()) {
      this.userSubject.next(loadedUser);
    } else {
      localStorage.removeItem('userData');
    }
  }

  checkIsAdminLoggedIn() {
    const isAdmin: boolean = JSON.parse(
      localStorage.getItem('isAdmin') as string
    );
    console.log('AuthService - checkIsAdminLoggedIn:', isAdmin);
    return isAdmin;
  }

  createNewUserHttp(loginCredentials: UserCredentials): Observable<any> {
    return this.http
      .post<any>(
        `${environment.settings.apiUrl}/api/add-user`,
        loginCredentials
      )
      .pipe(
        catchError((error) => {
          console.error('Failed to create user: ', error);
          return throwError(() => new Error('Failed to create user: ' + error));
        })
      );
  }

  createNewUser(loginCredentials: UserCredentials): Observable<any> {
    return this.createNewUserHttp(loginCredentials).pipe(
      switchMap((response: CreateNewUserObject) => {
        const userRecord = response.user;
        this.userSubject.next(userRecord);
        localStorage.setItem('userData', JSON.stringify(userRecord));
        return of(userRecord);
      }),
      catchError((error) => {
        console.error('Failed to create user: ', error);
        this.notificationManager.openSnackBar(
          'Sign-up failed: ' + error.message
        );
        return throwError(() => new Error('Failed to create user: ' + error));
      })
    );
  }

  logout(): void {
    this.userSubject.next(null);
    this.resetSubject.next(true);
  }
}
