import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';
import { tap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html'
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter = '';
  hasMore = true;
  userName = '';
  loading = false;
  photosPaginator: () => Observable<Photo[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userName = params.userName;
      this.photos = this.activatedRoute.snapshot.data['photos'];
      this.photosPaginator = this.photoService.getPaginator(this.userName, 2);
    });
  }

  load(event) {
    if (event != 'bottom') return;
    if (this.hasMore) {
      this.loading = true
      this.photosPaginator()
        .pipe(finalize(() => this.loading = false))
        .subscribe(photos => {
          this.filter = '';
          this.photos = this.photos.concat(photos);
          if (!photos.length) this.hasMore = false;
        });
    }
  }
}
