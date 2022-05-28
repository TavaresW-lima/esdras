import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DadosHeader } from './dados-header';

@Component({
    templateUrl: './modal-header-lista.component.html'
})
export class ModalHeaderListaComponent {

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
        this.activeModal.close(this.formHeader);
    }
}