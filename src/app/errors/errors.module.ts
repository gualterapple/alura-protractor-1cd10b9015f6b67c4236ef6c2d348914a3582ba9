import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { GlobalErrorHandler } from './global-error-handler/global-error-handler';
import { GlobalErrorComponent } from './global-error/global-error.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    NotFoundComponent,
    GlobalErrorComponent
  ],
  
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ]
  
  
})
export class ErrorsModule { }
