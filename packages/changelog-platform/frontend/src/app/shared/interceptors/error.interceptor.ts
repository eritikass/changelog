import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    // This is needed to avoid multiple error message display
    messageTimeout: any;
    constructor(
        private router: Router,
        private toastr: ToastrService
    ) {

    }
    showMessage(message): void {
        if (this.messageTimeout) {
            clearTimeout(this.messageTimeout);
        }
        this.messageTimeout = setTimeout(() => {
            this.toastr.error(message, 'Error');
        }, 300);
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(req)
            .catch((err: HttpErrorResponse) => {
                this.showMessage(err.error.message);
                if(err.status === 401){
                    localStorage.removeItem('access_token')
                    this.router.navigate(['/'])
                }
                return Observable.throw(err);
            });
    }
}
