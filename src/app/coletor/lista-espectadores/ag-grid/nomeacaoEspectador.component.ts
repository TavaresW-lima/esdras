import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { InfoEspectador } from '../../../model/info-espectador';

@Component({
    template: `
        <div class="w-full h-full flex justify-center">
            <div class="h-auto">
                <span *ngIf="data.tipo != 'MEMBRO BRASIL'" 
                    class="inline-flex items-center justify-center min-w-[20px] py-1 mr-2 text-xs font-bold leading-none text-zinc-800 bg-sky-500 rounded-full select-none">
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