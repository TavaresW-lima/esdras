import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { InfoEspectador } from '../../../model/info-espectador';

@Component({
    template: `
        <div class="w-full h-full flex justify-center">
            <div class="h-auto cursor-pointer group">
                <span *ngIf="data.tipo != 'MEMBRO BRASIL'; else membroBrasil" 
                    class="inline-flex items-center justify-center min-w-[20px] py-1 mr-2 text-xs font-bold leading-none 
                         text-zinc-800 bg-sky-500 rounded-full select-none
                           group-hover:bg-sky-600 group-active:bg-sky-700">
                    <ng-container *ngIf="data.tipo == 'PASTOR'">
                        P
                    </ng-container>
                    <ng-container *ngIf="data.tipo == 'MISSIONARIO'">
                        M
                    </ng-container>
                    <ng-container *ngIf="data.tipo == 'MEMBRO EXTERIOR'">
                        E
                    </ng-container>
                </span>
                <ng-template #membroBrasil>
                    <span class="inline-flex items-center justify-center w-[20px] h-[20px] mr-2 
                                 border-2 border-sky-500 rounded-full select-none
                                 group-hover:border-sky-600 group-active:border-sky-700">
                    </span>
                </ng-template>
            </div>
        </div>
    `
})
export class NomeacaoEspectadorCellRenderer implements ICellRendererAngularComp {
    public data: InfoEspectador;
    
    agInit(params: ICellRendererParams): void {
        this.data = params.data;
    }
    
    refresh(params: ICellRendererParams): boolean {
        return false;
    }
}