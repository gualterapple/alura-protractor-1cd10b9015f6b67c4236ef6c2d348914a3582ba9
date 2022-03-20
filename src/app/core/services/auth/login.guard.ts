import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable ,  of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

import { UserService } from '../user/user.service';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

            if(this.userService.isLogged()){
                return this.userService.getUser$()
                    .pipe(map(user => user.name))
                    .pipe(tap(userName => this.router.navigate(['user', userName])))
                    .pipe(switchMap(() => of(false)));
            }
            return true;
    }
}
