import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if ( token !== null) {
            if (!(req.body instanceof File)) {
                req = req.clone({
                    setHeaders: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Accept': 'application/json',
                        // 'Authorization': 'hcf1maejfiekps32foo3itrq9e',
                        'Authorization': localStorage.getItem('token')
                    },
                });
            }
        }
        return next
            .handle(req);
    }
}
