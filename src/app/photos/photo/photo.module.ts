import { NgModule } from '@angular/core';
import { PhotoComponent } from './photo.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [PhotoComponent],
    imports: [SharedModule],
    exports: [PhotoComponent]
})
export class PhotoModule { }