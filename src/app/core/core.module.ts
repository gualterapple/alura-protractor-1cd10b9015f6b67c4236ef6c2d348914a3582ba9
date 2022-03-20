import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './components/header/header.component';
import { RequestInterceptor } from './services/auth/request.interceptor';
import { ResponseInterceptor } from './services/auth/response.interceptor';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { LoginGuard } from './services/auth/login.guard';
import { PlatformDetectorService } from './services/plataform-detector/platform-detector.service';
import { TokenService } from './services/token/token.service';
import { UserService } from './services/user/user.service';


@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        SharedModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ResponseInterceptor,
            multi: true
        },
        AuthGuard,
        AuthService,
        LoginGuard,
        PlatformDetectorService,
        TokenService,
        UserService
    ]
})
export class CoreModule { }
