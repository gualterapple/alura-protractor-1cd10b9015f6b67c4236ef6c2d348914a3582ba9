import { NgModule } from "@angular/core";
import { PhotoDetailsComponent } from "./photo-details.component";
import { CommonModule } from "@angular/common";
import { PhotoModule } from "../photo/photo.module";
import { PhotoCommentsComponent } from "./photo-comments/photo-comments.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { PhotoOwnerOnlyDirective } from "./photo-owner-only/photo-owner-only.directive";
import { SharedModule } from '../../shared/shared.module';


@NgModule({
    declarations: [
        PhotoDetailsComponent, 
        PhotoCommentsComponent,
        PhotoOwnerOnlyDirective
    ],
    exports: [
        PhotoDetailsComponent, 
        PhotoCommentsComponent
    ],
    imports: [
        PhotoModule,
        SharedModule
    ]
})
export class PhotoDetailsModule { }