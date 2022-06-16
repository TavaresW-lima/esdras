import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ColDef, ColumnApi, GetRowIdParams, GridApi, GridOptions, GridReadyEvent, RowNode } from 'ag-grid-community';
import { AgGridUser } from '../../model/base/ag-grid-user';
import { InfoEspectador, TipoEspectador } from '../../model/info-espectador';
import { RemoveLineCellRenderer } from './ag-grid/removeLineCellRenderer.component';
import { NomeacaoEspectadorCellRenderer } from './ag-grid/nomeacaoEspectador.component';

import { PDFUtilService } from '../../shared/pdf/pdf-util-service.service';

import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { ListaEspectadoresPDFStrategy } from './lista-espectadores-pdf-strategy';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalHeaderListaComponent } from '../modal-header-lista/modal-header.lista.component';
import { DadosHeader } from '../modal-header-lista/dados-header';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ListaReaderUtilService } from './lista-reader.util';
import { ModalConfirmacaoUpload } from '../modal-confirmacao-upload/modal-confirmacao-upload.component';

@Component({
    selector: 'ui-lista-espectadores',
    templateUrl: './lista-espectadores.component.html'
})
export class ListaEspectadoresComponent implements AgGridUser {
    @Input() nomeList: InfoEspectador[] = [];

		@Output() nomeListChange: EventEmitter<InfoEspectador[]> = new EventEmitter<InfoEspectador[]>();

    public pdf = faFilePdf;
    public searchLens = faSearch;

		public gridContext = this;
    public columnDefs: ColDef[] = colDef;
    public gridApi: GridApi;
    public columnApi: ColumnApi;
		public getRowId = (params: GetRowIdParams) => params.data.id;
    public nomeFilter: string = '';

    constructor(
      private pdfUtilService: PDFUtilService,
      private modalService: NgbModal,
    ) {
      this.nomeFilter = '';
    }

    public onGridReady($event: GridReadyEvent) {
        this.gridApi = $event.api;
        this.columnApi = $event.columnApi;
        this.setDefaultSorting();
    }

    public removeLine(id: number) {
			this.gridApi.applyTransaction({
				remove: [{ id }]
			})
			this.nomeList = this.nomeList.filter(nome => nome.id != id);
      this.nomeListChange.emit(this.nomeList);
    }

    public exportarPDF(): void {
      let listaAExportar: InfoEspectador[] = [];
      this.gridApi.forEachNodeAfterFilterAndSort(node => listaAExportar.push(node.data));
      const strategy = new ListaEspectadoresPDFStrategy(listaAExportar);

      this.modalService
          .open(ModalHeaderListaComponent)
          .result
          .then((header: DadosHeader) => {
            strategy.setDispositivosOnline(header.dispositivos);
            strategy.setPessoasOnline(header.pessoas);
            strategy.setPessoasTemplo(header.pessoasTemplo);
            strategy.setHorarioDe(header.de);
            strategy.setHorarioAte(header.ate);
            this.pdfUtilService.setStrategy(strategy);
            this.pdfUtilService.geraPDF().open();
          })
          .catch(() => {});
    }

    public onListaUpload(lista: InfoEspectador[]) {
      if(this.nomeList.length > 0) {
        this.modalService
            .open(ModalConfirmacaoUpload)
            .result
            .then(() => {
              this.nomeList = lista;
              this.setDefaultSorting();
            })
      } else {
        this.nomeList = lista;
      }
    }

    public onFilterChange($event: string) {
      this.nomeFilter = $event;
      this.gridApi.onFilterChanged();
    }

    public isExternalFilterPresent = (): boolean => {
      return this.nomeFilter != undefined && this.nomeFilter.length > 0;
    }

    public doesExternalFilterPass = (node: RowNode): boolean => {
      const espectador: InfoEspectador = node.data;
      if(espectador.nome) {

        return espectador.nome.toLowerCase().includes(this.nomeFilter.toLowerCase());
      } else {
        return false;
      }
    }

    public setDefaultSorting(): void {
      this.columnApi.applyColumnState({
        state: [
          {colId: 'tipo', sort: 'asc'},
          {colId: 'localidade', sort: 'asc'}
        ],
        defaultState: {sort: null}
      })
    }
}

const colDef: ColDef[] = [
  {
    colId: 'tipo',
    cellRenderer: NomeacaoEspectadorCellRenderer,
    width: 50,
    sortable: true,
    comparator: (vA, vB, nodeA, nodeB, isInverted) => {
      const pesoTipoMap = new Map<TipoEspectador, number>([
        ['PASTOR', 0],
        ['MISSIONARIO', 1],
        ['MEMBRO EXTERIOR', 2],
        ['MEMBRO BRASIL', 3],
      ]);

      let pesoA = pesoTipoMap.get(nodeA.data.tipo);
      let pesoB = pesoTipoMap.get(nodeB.data.tipo);
      
      if(pesoA == undefined) pesoA = 3;
      if(pesoB == undefined) pesoB = 3;

      return  pesoA - pesoB;
    }
  },
  {
    colId: 'nome',
    headerName: 'Nome',
    field: 'nome',
    flex: 2,
    editable: true
  },
  {
    colId: 'localidade',
    headerName: 'Localidade',
    field: 'localidade',
    flex: 1,
    editable: true,
    sortable: true
  },
  {
    cellRenderer: RemoveLineCellRenderer,
    width: 50,
    suppressMenu: true,
    suppressMovable: true,
    resizable: false
  }
]