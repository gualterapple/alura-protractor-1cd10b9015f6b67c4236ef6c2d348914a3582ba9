import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedDirectiveModule } from './directives/shared-directives.module';
import { SharedComponentModule } from './components/shared-components.module';
import { SharedValidatorsModule } from './validators/shared-validators.module';

@NgModule({
    exports: [
        SharedDirectiveModule,
        SharedComponentModule,
        SharedValidatorsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
    ]   
})
export class SharedModule {}