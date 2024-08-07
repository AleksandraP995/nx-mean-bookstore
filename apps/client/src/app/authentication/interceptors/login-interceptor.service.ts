import {HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class LoginInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Outgoing req');

        // ako hocemo samo da modifikujemo req
        return next.handle(req)
    }
}