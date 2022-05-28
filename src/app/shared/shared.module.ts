import { NgModule } from "@angular/core";
import { AutoFocusDirective } from './directives/autoFocus.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AutoFocusDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AutoFocusDirective
    ]
})
export class SharedModule {

}