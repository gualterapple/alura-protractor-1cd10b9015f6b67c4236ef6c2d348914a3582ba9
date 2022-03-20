import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

const expression = /\D/g;
// without [ngModel], recebe o erro de no provider por ngControl se o componente não definir ngModel
// além disso, se ele não definir, não funciona a máscara.
@Directive({
    selector: '[ap-phone-mask2]'
})
export class PhoneMaskDirective2 {
    constructor(public model: NgControl) { }

    @HostListener('ngModelChange', ['$event'])
    onModelChange(value) {
        let newVal =value.replace(expression, '');
        this.onInputChange(newVal);
    }

    @HostListener('keydown.backspace', ['$event.target.value']) 
    onKeyDownBackSpace(value) {
        let newVal = value.replace(expression, '');
        newVal = newVal.substring(0, newVal.length - 1);
        this.onInputChange(newVal);
    }

    onInputChange(newVal: string) {
        
        if (newVal.length == 0) {
            newVal = '';
        } else if (newVal.length <= 3) {
            newVal = newVal.replace(/^(\d{0,3})/, '($1)');
        } else if (newVal.length <= 6) {
            newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) ($2)');
        } else {
            newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) ($2)-$3');
        }
        // set the new value
        this.model.valueAccessor.writeValue(newVal);
    }
}