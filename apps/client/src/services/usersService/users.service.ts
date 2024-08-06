import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  from,
  lastValueFrom,
  map,
  switchMap,
  throwError,
} from 'rxjs';
import {
  CreateNewUserObject,
  DeleteUserObject,
  GetAllUsersObject,
  UpdateUserEmailObject,
} from '../../models/userResponses';
import { BookstoreUser } from '../../models/user';
import { UserCredentials } from '../../app/users/userEnums';
import { environment } from '../../environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SetAdminClaimsObject } from '../../models/setAdminClaimsData';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  allUsersSubject: BehaviorSubject<BookstoreUser[]> = new BehaviorSubject<
    BookstoreUser[]
  >([]);
  get allUsersObservable$() {
    return this.allUsersSubject.asObservable();
  }

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth
  ) {}

  getAllUsers(): Observable<BookstoreUser[]> {

    return this.http
      .get<GetAllUsersObject>(`${environment.settings.apiUrl}/api/users`, {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
      })
      .pipe(
        map((data) => data['users']),
        catchError((error) => {
          console.error('Failed to retrieve users' + error);
          return throwError(
            () => new Error('Failed to retrieve users' + error)
          );
        })
      );
  }

  async loadAllUsers(): Promise<void> {
    try {
      const data$ = this.getAllUsers();
      const users = await lastValueFrom(data$);
      const sortedUsers = this.sortUsersList(users);
      this.allUsersSubject.next(sortedUsers);
    } catch (err) {
      console.error('error fetching users' + err);
    }
  }

  updateUserEmail(
    userId: string,
    newEmail: string
  ): Observable<UpdateUserEmailObject> {
    const body = { userId, newEmail };
    return this.http.post<UpdateUserEmailObject>(
      `${environment.settings.apiUrl}/api/update-email`,
      body,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  deleteUser(userId: string): Observable<DeleteUserObject> {
    return this.http.delete<DeleteUserObject>(
      `${environment.settings.apiUrl}/api/delete-user`,
      {
        body: { userId: userId },
      }
    );
  }

  private sortUsersList(userList: BookstoreUser[]) {
    const sortedUsers = userList.sort((a: BookstoreUser, b: BookstoreUser) => {
      return (
        new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime()
      );
    });
    return sortedUsers;
  }

  setAdminClaims(uid: string): Observable<SetAdminClaimsObject> {
    return from(this.afAuth.currentUser).pipe(
      switchMap(user => {
        if (user) {
          return from(user.getIdToken()).pipe(
            switchMap(idToken => {
              const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`
              });
              //jedini nacin da umesto : Observable<any> bude : Observable<SetAdminClaimsObject>
              //je da dodam pipe koji ce osigurati da ce tip biti SetAdminClaimsObject, u suprotnom baci gresku
              return this.http.post(`${environment.settings.apiUrl}/api/set-admin-claims`, { uid }, { headers }).pipe(map((response: any) => {
                return { message: response.message } as SetAdminClaimsObject;
              }),
              catchError(error => {
                console.error('Error in setAdminClaims:', error);
                return throwError(() => error);
              })
            );
          })
        );
        } else {
          throw new Error('User not authenticated');
        }
      }),
      catchError(error => {
        console.error('Error in setAdminClaims:', error);
        return throwError(() => error);
      })
    );
  }

  createNewUserFromAdminRole(
    userCredentials: UserCredentials
  ): Observable<BookstoreUser> {
    return this.http
      .post<CreateNewUserObject>(`${environment.settings.apiUrl}/api/add-user`, userCredentials)
      .pipe(
        map((response: CreateNewUserObject) => {
          const createdUser = response.user;
          const currentUsers = this.allUsersSubject.getValue();
          currentUsers.push(createdUser);
          const sortedUsers = this.sortUsersList(currentUsers);
          this.allUsersSubject.next(sortedUsers);
          return createdUser;
        }),
        catchError((error) => {
          console.error('Failed to create user' + error);
          return throwError(() => new Error('Failed to create user' + error));
        })
      );
  }
}
