import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HubService } from '@core/services/hub.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    // This is needed to avoid multiple error message display
    messageTimeout: any;
    constructor(
        private _router: Router,
        private _hub: HubService,
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
                    console.log(this._hub);
                    // this._hub.setIsLoggedIn(false)
                    Observable.throw(err);
                    this._router.navigate(['/'])
                }
                return Observable.throw(err);
            });
    }
}
