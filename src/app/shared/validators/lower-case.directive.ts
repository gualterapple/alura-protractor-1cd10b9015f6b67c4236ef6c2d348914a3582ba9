import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { lowerCaseValidator } from './lower-case.validator';
/** The main purpose of this directive is to allow the 
 * validator to be used in template driven form. If you 
 * only use model driven forms with ReactiveFormsModule, 
 * you don't need to create it!
 */
@Directive({
    selector: '[lowerCase][ngModel]',
    providers: [
        { 
            provide: NG_VALIDATORS, 
            useValue: lowerCaseValidator, 
            multi: true 
        }
      ]
})
export class LowerCaseDirective {}