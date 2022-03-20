import { Injectable } from '@angular/core';
import * as jtw_decode from 'jwt-decode';

const KEY = 'authToken';

@Injectable()
export class TokenService {

    hasToken() {
        return !!this.getToken();
    }

    setToken(token) {
        window.localStorage.setItem(KEY, token);
    }

    getToken() {
        return window.localStorage.getItem(KEY);
    }

    removeToken() {
        window.localStorage.removeItem(KEY);
    }

    hasExpired() {
        if(this.hasToken()) {
            const token = jtw_decode(this.getToken());
            const current_time = Date.now() / 1000;
            return token.exp < current_time
        }
        return false;
    }

}
