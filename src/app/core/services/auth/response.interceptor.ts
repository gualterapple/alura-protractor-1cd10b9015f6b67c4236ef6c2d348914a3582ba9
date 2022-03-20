import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpSentEvent, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { UserService } from '../user/user.service';
import { AlertService } from '../../../shared/components/alert/alert.service';

@Injectable({providedIn: 'root'})
export class ResponseInterceptor implements HttpInterceptor {

    constructor(
        private userService: UserService,
        private router: Router,
        private alertService: AlertService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent
    | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        return next.handle(req)
            .pipe(catchError(err => {
                // if it's 401 and the user is logged, do nothing
                if (err instanceof HttpErrorResponse
                        && err.status == 401
                        && !this.userService.isLogged()) {
                    //  can have an expiredToken, so clean it
                    this.userService.discartToken();
                    // aumentar tempo e alinhamento
                    this.alertService.warning('Session timeout, please login.', true);
                    this.router.navigate(['home']);
                }
                return throwError(err);
            }));
    }
}
