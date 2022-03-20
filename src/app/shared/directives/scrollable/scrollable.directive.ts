import { Directive, HostListener, EventEmitter, Output, ElementRef } from '@angular/core';
import { PlatformDetectorService } from '../../../core/services/plataform-detector/platform-detector.service';

@Directive({
    selector: '[ap-scrollable]'
})
export class ScrollableDirective {

    @Output() scrollPosition = new EventEmitter()
    isBrowser = true;

    constructor(
        public el: ElementRef,
        platformDetectorService: PlatformDetectorService) {
        this.isBrowser = platformDetectorService.isPlatformBrowser();
    }

    @HostListener('scroll', ['$event'])
    onScroll(event) {
        if (this.isBrowser) {

            const top = event.target.scrollTop
            const height = this.el.nativeElement.scrollHeight
            const offset = this.el.nativeElement.offsetHeight

            // emit bottom event
            if (top > height - offset - 1) this.scrollPosition.emit('bottom');
            if (top === 0) this.scrollPosition.emit('top')
        }
    }
}
