import { Directive, HostListener, Output, ElementRef, EventEmitter, Renderer2, OnDestroy } from '@angular/core';
import { InfoEspectador } from '../../../model/info-espectador';
import { ListaReaderUtilService } from '../../../coletor/lista-espectadores/lista-reader.util';

@Directive({
    selector: '[appFileUploadOverlay]'
})
export class UploadFileOverlayDirective implements OnDestroy {
    
    @Output() onUpload: EventEmitter<InfoEspectador[]> = new EventEmitter<InfoEspectador[]>();
    dropAreaEl: HTMLInputElement;
    
    constructor(
        public el: ElementRef<HTMLDivElement>,
        public readerUtil: ListaReaderUtilService,
        public renderer: Renderer2
    ) {
        renderer.listen(window, 'drop', (event) => event.preventDefault());
        renderer.addClass(this.el.nativeElement, 'relative')
        const newEl:HTMLInputElement = renderer.createElement('input');
        newEl.className = `absolute w-full h-full text-white text-3xl font-bold bg-sky-600/90 left-0 top-0 caret-transparent text-center`;
        newEl.value = 'Solte para carregar a lista...';
        renderer.listen(newEl, 'dragleave', this.dragLeaveOverlay);
        renderer.listen(newEl, 'drop', this.drop);
        this.dropAreaEl = newEl;

    }

    @HostListener('dragenter', ["$event"])
    dragEnterOverlay(event: any) {
        this.renderer.appendChild(this.el.nativeElement, this.dropAreaEl);
        event.preventDefault();
    }

    dragLeaveOverlay = (event:any) => {
        this.renderer.removeChild(this.el.nativeElement, this.dropAreaEl, true);
        event.preventDefault();
    }

    @HostListener('drop', ["$event"])
    drop = (event: DragEvent) => {
        event.stopImmediatePropagation();
        event.preventDefault();
        const files =  event.dataTransfer?.files;
        this.onFileUpload(files);        
    }

    private onFileUpload(files: FileList | undefined): void {
        if(files && files[0]) {
            const file = files[0];
            this.lerArquivo(file)
                .then(lista => {
                    this.onUpload.emit(lista)
                    this.renderer.removeChild(this.el.nativeElement, this.dropAreaEl, true);
                })
                .catch((err) => {
                    this.renderer.removeChild(this.el.nativeElement, this.dropAreaEl, true);
                })
            ;
        }
    }

    private async lerArquivo(arquivo: File): Promise<InfoEspectador[]> {
        return await this.readerUtil.lerLista(arquivo)
    }

    public ngOnDestroy(): void {
        window.removeEventListener('drop', ($event) => $event.preventDefault());
    }
}