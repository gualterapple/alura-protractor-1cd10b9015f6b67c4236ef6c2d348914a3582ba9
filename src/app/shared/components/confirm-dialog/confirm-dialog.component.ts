import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
    selector: 'ap-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

    constructor(private scrollService: ScrollService) {}
    
    @Input() message = 'Are you sure?';
    @Output() onConfirm = new EventEmitter<void>();
    @Output() onDismiss = new EventEmitter<void>();

    @ViewChild('buttonConfirm', { static: true }) firstFocusableEl: ElementRef<HTMLButtonElement>;
    @ViewChild('buttonDismiss', { static: true }) lastFocusableEl: ElementRef<HTMLButtonElement>;
    
    isShown = false;
    
    confirm() {
        this.dismiss();
        this.onConfirm.emit();
    }

    show() {
        this.scrollService.disableScrolling();
        this.lastFocusableEl.nativeElement.focus();
        this.isShown = true;
    }
    
    dismiss() {
       this.isShown = false;
       this.scrollService.enableScrolling();
       this.onDismiss.emit();
    }

    handleTab(event: any) {        
        console.log(this.firstFocusableEl);
        const isTabPressed = event.key === 'Tab';
        const isShiftPressed = event.shiftKey;

        if (!isTabPressed) return; 
        
        if(event.shiftKey) { // SHIFT + TAB
            if(document.activeElement === this.firstFocusableEl.nativeElement) {
                this.lastFocusableEl.nativeElement.focus();
                event.preventDefault();
            }
        } else { // TAB
            if (document.activeElement === this.lastFocusableEl.nativeElement) {
                this.firstFocusableEl.nativeElement.focus();
                event.preventDefault();
            }
        }
        
    }
}