import { Injectable } from '@angular/core';
import { DomService } from '../../services/dom.service';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class ConfirmDialogService {

    constructor(private domService: DomService) {}

    open({ onConfirm }) {
        const componentRef = this.domService.getComponentRef(ConfirmDialogComponent);
        componentRef.onDestroy(() => console.log('Dynâmic created ConfirmDialogComponent destroyed'));
        console.log('ComponentRef created', componentRef);
        const instance  = <ConfirmDialogComponent>componentRef.instance;
        console.log('Component instance created', instance);
        instance.onConfirm.subscribe(() => {
            onConfirm();
            componentRef.destroy();
            console.log('Component subscribe ready');
        });
        instance.onDismiss
            .pipe(delay(300))
            .subscribe(() => componentRef.destroy());
        this.domService.appendComponentToBody(componentRef);
        instance.show();
        console.log('Component added to DOM');
    }
}