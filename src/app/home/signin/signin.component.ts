import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/services/plataform-detector/platform-detector.service';

import { AuthService } from '../../core/services/auth/auth.service';
import { AlertService } from '../../shared/components/alert/alert.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {

    fromUrl: string;
    loginForm: FormGroup;
    @ViewChild('userNameInput', { static: true }) userNameInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService,
        private activatedRoute: ActivatedRoute,
        private alerService: AlertService
    ) { }

    ngOnInit(): void {
        this.activatedRoute
            .queryParamMap
            .subscribe(params =>
                    this.fromUrl = params.get('fromUrl'));

        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.platformDetectorService.isPlatformBrowser() &&
        this.userNameInput.nativeElement.focus();
    }

    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        this.authService
            .authenticate(userName, password)
            .subscribe(
                () => this.fromUrl
                    ? this.router.navigateByUrl(this.fromUrl)
                    : this.router.navigate(['user', userName])
                ,
                err => {
                    console.log(err);
                    this.loginForm.reset();
                    this.platformDetectorService.isPlatformBrowser() &&
                        this.userNameInput.nativeElement.focus();
                        this.alerService.danger('Invalid user name or password');
                }
            );
    }
}
