import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Observable } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";

import { PhotoService } from "../../photo/photo.service";
import { PhotoComment } from "../../photo/photo-comment";

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['photo-comments.scss']
})
export class PhotoCommentsComponent implements OnInit { 

    @Output() onAdd = new EventEmitter<string>();
    @Input() comments: PhotoComment[];
    commentForm: FormGroup;

    constructor(
        private photoService: PhotoService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.commentForm = this.formBuilder.group({
            comment: [
                '', [Validators.required,Validators.maxLength(300)]
            ]
        });
    }

    save() {
        const comment = this.commentForm.get('comment').value as string;
        this.commentForm.reset();
        this.onAdd.emit(comment);
    }
}