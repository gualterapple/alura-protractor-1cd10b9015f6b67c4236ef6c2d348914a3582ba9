import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ScrollService {

    previousOverflowValue = '';

    enableScrolling() {
        window.document.body.style.overflow = this.previousOverflowValue;
    }

    disableScrolling() {
        window.document.body.style.overflow = 'hidden';
    }
}