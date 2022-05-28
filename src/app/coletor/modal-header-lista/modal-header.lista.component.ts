import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DadosHeader } from './dados-header';

@Component({
    templateUrl: './modal-header-lista.component.html'
})
export class ModalHeaderListaComponent {

    public formHeader: Partial<DadosHeader> = {
        dispositivos: 0,
        pessoas: 0,
        pessoasTemplo: 0
    }

    constructor(
        public activeModal: NgbActiveModal
    ) {}

    public returnHeader() {
        this.activeModal.close(this.formHeader);
    }
}