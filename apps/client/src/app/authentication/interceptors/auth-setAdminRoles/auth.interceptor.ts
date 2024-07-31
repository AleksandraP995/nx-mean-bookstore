import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private afAuth: AngularFireAuth) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Define routes that need authentication
    const secureUrls = ['/set-admin-claims'];

    const isSecureUrl = secureUrls.some(url => req.url.includes(url));

    if (isSecureUrl) {
      return from(this.afAuth.currentUser).pipe(
        switchMap(user => {
          if (user) {
            return from(user.getIdToken()).pipe(
              switchMap(idToken => {
                console.log(`Attaching token to request: ${req.url}`);
                const cloned = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${idToken}`
                  }
                });
                return next.handle(cloned);
              })
            );
          } else {
            console.log(`User not authenticated, proceeding without token for: ${req.url}`);
            return next.handle(req);
          }
        })
      );
    }

    console.log(`Non-secure URL, proceeding without token: ${req.url}`);
    return next.handle(req);
  }
}




