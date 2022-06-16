import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { InfoEspectador } from 'src/app/model/info-espectador';
import { ListaReaderUtilService } from '../../../coletor/lista-espectadores/lista-reader.util';

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
            class="text-sm px-2 py-1 cursor-pointer border border-slate-50 text-slate-50
                   hover:border-sky-500 hover:text-sky-500 hover:bg-white/5 
                   active:text-sky-600 active:border-sky-600 transition-colors"
            (click)="fileUploadInput.click()"
        >
            <fa-icon [icon]="upload"></fa-icon>
            <ng-content></ng-content>
        </button>
    `
})
export class UploadFileButton {
    public upload = faFileUpload;

    constructor(
        private readerUtil: ListaReaderUtilService
    ) {}

    @Input() accept: string = 'text/plain';
    @Output() onUpload: EventEmitter<InfoEspectador[]> = new EventEmitter<InfoEspectador[]>();
    @ViewChild('fileUploadInput') private input: ElementRef<HTMLInputElement>;

    public onFileUpload($event: FileList | null): void {
        if($event && $event[0]) {
            const file = $event[0];
            this.lerArquivo(file)
                .then(lista => {
                    this.onUpload.emit(lista)
                    this.input.nativeElement.value = '';
                })
                .catch((err) => {
                    this.input.nativeElement.value = '';
                })
            ;
        }
    }

    private async lerArquivo(arquivo: File): Promise<InfoEspectador[]> {
        return await this.readerUtil.lerLista(arquivo)
    }

}