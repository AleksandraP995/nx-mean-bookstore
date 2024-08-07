import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Req is on the way');
        console.log(req.url);
        const modifedReq =  req.clone({ headers: req.headers.append('Auth', 'xzy')});

        return next.handle(modifedReq).pipe(tap(event => {
            if(event.type == HttpEventType.Response) {
                console.log('Response arrived');
                console.log(event.body)
            }
        }));

    }
}