import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Observable } from 'rxjs';
import { User } from '../../services/user/user';
import { Router } from '@angular/router';

@Component({
    selector: 'ap-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    user$: Observable<User>;

    constructor(
        private userService: UserService,
        private router:Router) {

        this.user$ = userService.getUser$();
    }
}
