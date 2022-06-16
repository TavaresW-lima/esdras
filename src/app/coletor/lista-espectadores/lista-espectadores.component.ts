import { Component, EventEmitter, Input, Output} from '@angular/core';
import { ColDef, ColumnApi, ColumnState, GetRowIdParams, GridApi, GridReadyEvent, RowNode } from 'ag-grid-community';
import { AgGridUser } from '../../model/base/ag-grid-user';
import { InfoEspectador, TipoEspectador } from '../../model/info-espectador';
import { RemoveLineCellRenderer } from './ag-grid/removeLineCellRenderer.component';
import { NomeacaoEspectadorCellRenderer } from './ag-grid/nomeacaoEspectador.component';

import { PDFUtilService } from '../../shared/pdf/pdf-util-service.service';

import { faSearch, faFilePdf, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import { ListaEspectadoresPDFStrategy } from './lista-espectadores-pdf-strategy';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalHeaderListaComponent } from '../modal-header-lista/modal-header.lista.component';
import { DadosHeader } from '../modal-header-lista/dados-header';
import { ModalConfirmacaoUpload } from '../modal-confirmacao-upload/modal-confirmacao-upload.component';
import { PRINT_ORDER_STATE } from './ag-grid/sortStates';
import { ExportAction } from '../modal-header-lista/export-action';
import { ListaPlainTextUtilService } from '../../shared/services/lista-plain-text.util';

@Component({
    selector: 'ui-lista-espectadores',
    templateUrl: './lista-espectadores.component.html'
})
export class ListaEspectadoresComponent implements AgGridUser {
    @Input() nomeList: InfoEspectador[] = [];
		@Output() nomeListChange: EventEmitter<InfoEspectador[]> = new EventEmitter<InfoEspectador[]>();

    public pdf = faFilePdf;
    public searchLens = faSearch;
    public sort = faSortAmountDown;

		public gridContext = this;
    public columnDefs: ColDef[] = colDef;
    public gridApi: GridApi;
    public columnApi: ColumnApi;
		public getRowId = (params: GetRowIdParams) => params.data.id;
    public nomeFilter: string = '';

    public printOrderSorting: boolean = true;

    constructor(
      private pdfUtilService: PDFUtilService,
      private modalService: NgbModal,
      private plainTextUtil: ListaPlainTextUtilService
    ) {
      this.nomeFilter = '';
    }

    public onGridReady($event: GridReadyEvent) {
        this.gridApi = $event.api;
        this.columnApi = $event.columnApi;
        this.setSortState(PRINT_ORDER_STATE);
    }

    public removeLine(id: number) {
			this.gridApi.applyTransaction({
				remove: [{ id }]
			})
			this.nomeList = this.nomeList.filter(nome => nome.id != id);
      this.nomeListChange.emit(this.nomeList);
    }

    public exportar(): void {
      let listaAExportar: InfoEspectador[] = [];
      this.gridApi.forEachNodeAfterFilterAndSort(node => listaAExportar.push(node.data));

      this.modalService
          .open(ModalHeaderListaComponent)
          .result
          .then((res: ExportAction) => {
            if(res.action == 'PDF') {
              this.abrePDF(res.content, listaAExportar);
            } else {
              this.downloadTXT(listaAExportar);
            }
          })
          .catch(() => {});
    }

    private abrePDF(header: DadosHeader, lista: InfoEspectador[]) {
      const strategy = new ListaEspectadoresPDFStrategy(lista);
      strategy.setDispositivosOnline(header.dispositivos);
      strategy.setPessoasOnline(header.pessoas);
      strategy.setPessoasTemplo(header.pessoasTemplo);
      strategy.setHorarioDe(header.de);
      strategy.setHorarioAte(header.ate);
      this.pdfUtilService.setStrategy(strategy);
      this.pdfUtilService.geraPDF().open();
    }

    private downloadTXT(lista: InfoEspectador[]) {
      const arquivo = this.plainTextUtil.getFileFromLista(lista);
      const urlArquivo = URL.createObjectURL(arquivo);
      const link: HTMLAnchorElement = document.createElement('a');
      link.download = `Lista ${new Date().toLocaleDateString()}`;
      link.href = urlArquivo;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    public onListaUpload(lista: InfoEspectador[]) {
      if(this.nomeList.length > 0) {
        this.modalService
            .open(ModalConfirmacaoUpload)
            .result
            .then(() => {
              this.nomeListChange.emit(this.nomeList);
            })
      } else {
        this.nomeList = lista;
        this.nomeListChange.emit(this.nomeList);
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

    public setSortState( state: ColumnState[]): void {
      this.columnApi.applyColumnState({
        state, defaultState: {sort: null}
      })
    }

    public toggleSort(): void {
      if(this.printOrderSorting) {
        this.columnApi.resetColumnState();
        this.printOrderSorting = false;
      } else {
        this.setSortState(PRINT_ORDER_STATE);
        this.printOrderSorting = true;
      }
    }
}

const colDef: ColDef[] = [
  {
    colId: 'tipo',
    cellRenderer: NomeacaoEspectadorCellRenderer,
    width: 50,
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
    editable: true
  },
  {
    cellRenderer: RemoveLineCellRenderer,
    width: 50,
    suppressMenu: true,
    suppressMovable: true,
    resizable: false
  }
]