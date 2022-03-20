import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap, tap } from 'rxjs/operators';

import { PhotoService } from "../photo/photo.service";
import { Photo } from "../photo/photo";
import { AlertService } from "../../shared/components/alert/alert.service";
import { UserService } from "../../core/services/user/user.service";
import { PhotoComment } from '../photo/photo-comment';
import { ConfirmDialogService } from '../../shared/components/confirm-dialog/confirm-dialog.service';

@Component({
    templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {

    photo$: Observable<Photo>;
    comments$: Observable<PhotoComment[]>
    photoId: number;
    commentsCountFromCurrentUser = 0;

    constructor(
        private route: ActivatedRoute,
        private photoService: PhotoService,
        private router: Router,
        private alertService: AlertService,
        private userService: UserService,
        private confirmDialogService: ConfirmDialogService
    ) {}

    ngOnInit(): void {
        this.photoId = parseInt(this.route.snapshot.paramMap.get('photoId'));
        this.comments$ = this.photoService.getComments(this.photoId);

        this.photo$ = this.photoService.findById(this.photoId);
        this.photo$.subscribe(() => {}, err => {
            console.log(err);
            this.router.navigate(['not-found']);
        });
    }

    remove() {
        this.confirmDialogService.open({
            onConfirm: () => {
                this.photoService
                .removePhoto(this.photoId)
                .pipe(switchMap(() => this.userService.getUser$()))
                .subscribe(
                    user => {
                        this.alertService.success("Photo removed", true);
                        this.router.navigate(['/user', user.name], { replaceUrl: true });
                    },
                    err => {
                        console.log(err);
                        this.alertService.warning('Could not delete the photo!', true);
                    });
            }
        });
    }

    like(photo: Photo) {
        this.photoService
            .like(photo.id)
            .subscribe(liked => {
                if(liked) {
                    this.photo$ = this.photoService.findById(photo.id);
                }
            });
    }

    addComment(comment: string) {
        this.comments$ = this.photoService
            .addComment(this.photoId, comment)
            .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
            .pipe(tap(() => this.commentsCountFromCurrentUser++));
    }
}
