import { NgModule } from '@angular/core';
import { LowerCaseDirective } from './lower-case.directive';

@NgModule({
    declarations: [LowerCaseDirective],
    exports: [LowerCaseDirective]
})
export class SharedValidatorsModule {}