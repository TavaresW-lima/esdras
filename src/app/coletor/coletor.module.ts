import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ColetorComponent } from './coletor.component';
import { ListaEspectadoresComponent } from './lista-espectadores/lista-espectadores.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RemoveLineCellRenderer } from './lista-espectadores/ag-grid/removeLineCellRenderer.component';
import { NomeacaoEspectadorCellRenderer } from './lista-espectadores/ag-grid/nomeacaoEspectador.component';
import { PDFUtilService } from '../shared/pdf/pdf-util-service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalHeaderListaComponent } from './modal-header-lista/modal-header.lista.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { ModalConfirmacaoUpload } from './modal-confirmacao-upload/modal-confirmacao-upload.component';

@NgModule({
    declarations: [
        ColetorComponent,
        ListaEspectadoresComponent,
        RemoveLineCellRenderer,
        NomeacaoEspectadorCellRenderer,
        ModalHeaderListaComponent,
        ModalConfirmacaoUpload
    ],
    imports: [
        CommonModule,
        FormsModule,
        AgGridModule,
        NgbModule,
        FontAwesomeModule,
        SharedModule,
        ComponentsModule
    ],
    exports: [
        ColetorComponent
    ],
    providers: [
        PDFUtilService
    ]
})
export class ColetorModule {
}