import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AlertComponent } from './alert/alert.component';
import { CardComponent } from './card/card.component';
import { LoadingComponent } from './loading/loading.component';
import { MenuComponent } from './menu/menu.component';
import { VMessageComponent } from './vmessage/vmessage.component';
import { LoadingInterceptor } from './loading/loading.interceptor';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AvatarComponent } from './avatar/avatar.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { RouterModule } from '@angular/router';
import { ConnectionStatusComponent } from './connection-status/connection-status.component';

@NgModule({
    declarations: [
        AlertComponent,
        CardComponent,
        LoadingComponent,
        MenuComponent,
        VMessageComponent,
        ConfirmDialogComponent,
        AvatarComponent,
        ProfileMenuComponent,
        ConnectionStatusComponent
    ],
    entryComponents: [
        ConfirmDialogComponent,
        ConnectionStatusComponent
    ],
    exports: [
        AlertComponent,
        CardComponent,
        LoadingComponent,
        MenuComponent,
        VMessageComponent,
        AvatarComponent,
        ProfileMenuComponent,
        ConnectionStatusComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingInterceptor,
        multi: true
    }]   
})
export class SharedComponentModule {}