import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { UserService } from '../../../core/services/user/user.service';
import { User } from '../../../core/services/user/user';

@Component({
    selector: 'ap-profile-menu',
    templateUrl: './profile-menu.component.html',
    styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent {

    isShown = false;

    user$: Observable<User>
    constructor(
        private userService: UserService,
        private router:Router) {
        this.user$ = userService.getUser$();
    }

    logout() {
        this.userService.discartToken();
        this.router.navigate(['home']);
    }

    toggle() {
        this.isShown = !this.isShown;
    }
}
