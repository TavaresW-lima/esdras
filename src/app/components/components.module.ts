import { NgModule } from "@angular/core";
import { UploadFileButton } from './upload-file-button/upload-file-button.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        UploadFileButton,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule
    ],
    exports: [
        UploadFileButton
    ]
})
export class ComponentsModule {

}