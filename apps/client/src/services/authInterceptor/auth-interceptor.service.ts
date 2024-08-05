import { Injectable } from '@angular/core';
import { AuthService } from '../authService/auth.service';
import { HttpClient, HttpHandler,HttpRequest } from '@angular/common/http';
import { take } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {
  env = environment;
  googleUrl = this.env.settings.googleBooksApiUrl;

  constructor(private authService: AuthService, private http: HttpClient) { }

  // ideja: da doda userToken u http req kao middleware, a ne direktno u svakom requestu mi manuelno da namestamo
  intercept(query: string, maxResults: number, startIndex:number, req: HttpRequest<any>, next:HttpHandler) {
    const url = `${
      this.googleUrl
    }/volumes?q=${query}&maxResults=${maxResults}&startIndex=${
      maxResults * startIndex
    }`;

    this.authService.userObservable$.subscribe(user => {
      take(1)
      // exhaustMap((user: User) => {
      //  const modifiedRequest = req.clone({ params: new HttpParams().set('auth', user.token)})
      //   });
      });
    return next.handle(req)
  }
}
