import { Component } from "@angular/core";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './modal-confirmacao-upload.component.html'
})
export class ModalConfirmacaoUpload {
    constructor(
        public activeModal: NgbActiveModal
    ) {}
}