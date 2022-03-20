import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

            if(!this.userService.isLogged()){
                this.router.navigate(
                    ['home'],
                    {
                        queryParams: {
                            fromUrl: state.url
                        }
                    }
                );
                return false;
            }
            return true;
    }
}
