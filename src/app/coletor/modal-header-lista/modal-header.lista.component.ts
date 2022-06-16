import { Component } from '@angular/core';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DadosHeader } from './dados-header';
import { ListaPlainTextUtilService } from '../../shared/services/lista-plain-text.util';
import { ExportAction } from './export-action';

@Component({
    templateUrl: './modal-header-lista.component.html'
})
export class ModalHeaderListaComponent {

    downloadIcon = faFileDownload;

    public formHeader: Partial<DadosHeader> = {
        dispositivos: undefined,
        pessoas: undefined,
        pessoasTemplo: undefined,
        de: undefined,
        ate: undefined
    }

    constructor(
        public activeModal: NgbActiveModal
    ) {
        const now = new Date();
        let hours = String(now.getHours()).padStart(2, '0');
        let minutes = String(now.getMinutes()).padStart(2, '0');
        this.formHeader.ate = `${hours}:${minutes}`
    }

    public returnHeader() {
        const action: ExportAction = {
            action: 'PDF',
            content: this.formHeader
        }
        this.activeModal.close(action);
    }

    public downloadTextFile() {
        const action: ExportAction =  {
            action: 'TXT',
            content: null
        }
        this.activeModal.close(action)
    }
}