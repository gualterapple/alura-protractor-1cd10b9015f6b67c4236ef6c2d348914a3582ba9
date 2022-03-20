import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import * as jtw_decode from 'jwt-decode';
import { AlertService } from '../../../shared/components/alert/alert.service';

@Injectable({ providedIn: 'root'})
export class UserService {

    private userSubject = new BehaviorSubject<User>(null);
    private user$: Observable<User>;

    constructor(
        private tokenService: TokenService,
        private alertService: AlertService) {

        this.user$ = this.userSubject.asObservable();

        if(this.tokenService.hasToken()) {
            if(tokenService.hasExpired()) {
                this.alertService.warning('Session expired. Please, login!', true);
                this.discartToken()
            } else {
                this.decodeAndNotify();
            }
        }
    }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    getUser$() {
        return this.user$;
    }

    private decodeAndNotify() {
        const token = this.tokenService.getToken();
        const user = jtw_decode(token) as User;
        this.userSubject.next(user);
    }

    discartToken() {
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }

    isLogged() {
        return this.tokenService.hasToken() && !this.tokenService.hasExpired();
    }
}
