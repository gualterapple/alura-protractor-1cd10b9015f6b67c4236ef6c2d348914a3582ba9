import { NgModule, ModuleWithProviders } from '@angular/core';

import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './singup/singup.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SignUpService } from './singup/signup.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        SignInComponent,
        SignUpComponent,
        HomeComponent
    ],
    imports: [
        SharedModule,
        HomeRoutingModule
    ]
})
export class HomeModule {
  static forRoot(): ModuleWithProviders<HomeModule> {
    return {
      ngModule: HomeModule,
      providers: [SignUpService]
    };
  }
}
