import { NgModule } from '@angular/core';
import { PhotoFormComponent } from './photo-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PhotoModule } from '../photo/photo.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [PhotoFormComponent],
    imports: [ 
        PhotoModule,
        SharedModule
    ]
})
export class PhotoFormModule { }