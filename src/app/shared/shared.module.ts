import { NgModule } from "@angular/core";
import { AutoFocusDirective } from './directives/autoFocus.directive';
import { CommonModule } from '@angular/common';
import { UploadFileOverlayDirective } from '../ui/upload-file/upload-file-overlay/upload-file-overlay.directive';
import { LocalidadeValidatorDirective } from './directives/localidadeValidator.directive';

@NgModule({
    declarations: [
        AutoFocusDirective,
        UploadFileOverlayDirective,
        LocalidadeValidatorDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AutoFocusDirective,
        UploadFileOverlayDirective,
        LocalidadeValidatorDirective
    ]
})
export class SharedModule {

}