import { NgModule } from "@angular/core";
import { AutoFocusDirective } from './directives/autoFocus.directive';
import { CommonModule } from '@angular/common';
import { UploadFileOverlayDirective } from '../ui/upload-file/upload-file-overlay/upload-file-overlay.directive';

@NgModule({
    declarations: [
        AutoFocusDirective,
        UploadFileOverlayDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AutoFocusDirective,
        UploadFileOverlayDirective
    ]
})
export class SharedModule {

}