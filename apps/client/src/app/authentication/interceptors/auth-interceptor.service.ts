import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Req is on the way');
        console.log(req.url);
        //ne moze req.url = 'new url' jer je req immutable
        const modifedReq =  req.clone({ headers: req.headers.append('Auth', 'xzy')});

        // ako hocemo samo da modifikujemo req
        // return next.handle(modifedReq)

        //ako hocemo da mmodifikujemo response
        return next.handle(modifedReq).pipe(tap(event => {
            if(event.type == HttpEventType.Response) {
                console.log('Response arrived');
                console.log(event.body)
            }
        }));

    }
}