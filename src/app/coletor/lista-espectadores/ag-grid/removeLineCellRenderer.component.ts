import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ListaEspectadoresComponent } from '../lista-espectadores.component';

import {
    faMinusSquare
} from '@fortawesome/free-regular-svg-icons'


@Component({
    template: `
        <div class="w-100 flex items-center">
            <button 
                class="px-2 text-red-400 hover:text-red-600 active:text-red-800 cursor-pointer disabled:text-sky-200"
                (click)="removeLine()">
                <fa-icon [icon]="icon_excluir"    
                    title="Remover"
                ></fa-icon>
            </button>
        </div>    
    `
})
export class RemoveLineCellRenderer implements ICellRendererAngularComp {
    public context: ListaEspectadoresComponent;
    public params: ICellRendererParams;
    public icon_excluir = faMinusSquare;
    
    agInit(params: ICellRendererParams): void {
        this.params = params;
        this.context = params.context;
    }

    removeLine() {
        this.context?.removeLine(this.params.data.id);
    }
    
    refresh(params: ICellRendererParams): boolean {
        return false;
    }
}