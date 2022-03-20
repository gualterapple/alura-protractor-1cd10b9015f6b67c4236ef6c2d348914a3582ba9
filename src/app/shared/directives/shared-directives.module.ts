import { NgModule } from '@angular/core';

import { DarkenOnHoverDirective } from './darken-on-hover/darken-on-hover.directive';
import { ImmediateClickDirective } from './immediate-click/immediate-click.directive';
import { ShowIfLoggedDirective } from './show-if-logged/show-if-logged.directive';
import { PhoneMaskDirective } from './input-masks/phone-mask/photo-mask.directive';
import { PhoneMaskDirective2 } from './input-masks/phone-mask/photo-mask.directive2';
import { ScrollableDirective } from './scrollable/scrollable.directive';


@NgModule({
    declarations: [
        DarkenOnHoverDirective,
        ImmediateClickDirective,
        ShowIfLoggedDirective,
        PhoneMaskDirective,
        PhoneMaskDirective2,
        ScrollableDirective
    ],
    exports: [
        DarkenOnHoverDirective,
        ImmediateClickDirective,
        ShowIfLoggedDirective,
        PhoneMaskDirective,
        PhoneMaskDirective2,
        ScrollableDirective
    ]
})
export class SharedDirectiveModule {}