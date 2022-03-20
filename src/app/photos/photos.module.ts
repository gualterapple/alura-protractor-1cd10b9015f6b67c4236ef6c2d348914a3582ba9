import { NgModule } from '@angular/core';

import { PhotoModule } from './photo/photo.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoDetailsModule } from './photo-details/photo-details.module';
import { PhotosRoutingModule } from './photos.routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [ 
        PhotoModule,
        PhotoFormModule,
        PhotoListModule,
        PhotoDetailsModule,
        PhotosRoutingModule
    ]
})
export class PhotosModule {}