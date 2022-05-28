import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'ui-upload-file-button',
    template: `
        <input 
            #fileUploadInput 
            type="file" 
            class="hidden" 
            ngModel
            (ngModelChange)="onFileUpload(fileUploadInput.files)"
            [accept]="accept"
        />
        <button 
            class="text-sm px-2 py-1 cursor-pointer border border-zinc-500 text-zinc-500
                hover:border-sky-500 active:text-sky-600 active:border-sky-600 
                hover:bg-sky-100"
            (click)="fileUploadInput.click()"
        >
            <fa-icon [icon]="upload"></fa-icon>
            <ng-content></ng-content>
        </button>
    `
})
export class UploadFileButton {
    public upload = faFileUpload;

    @Input() accept: string = 'text/plain';
    @Output() onUpload: EventEmitter<File> = new EventEmitter<File>();

    public onFileUpload($event: FileList | null): void {
        if($event && $event[0]) {
            const file = $event[0];
            this.onUpload.emit(file);
        }
    }

}