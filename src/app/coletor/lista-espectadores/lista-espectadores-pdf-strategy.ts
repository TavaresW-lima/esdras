import { Content, ContentTable } from 'pdfmake/interfaces';
import { PdfMakingStrategy } from '../../shared/pdf/pdf-making-strategy';
import { InfoEspectador } from '../../model/info-espectador';
import { style } from '@angular/animations';

export class ListaEspectadoresPDFStrategy implements PdfMakingStrategy {

    private espectadorList: InfoEspectador[];
    private dispOnline: number;
    private pessoasOnline: number;
    private pessoasTemplo: number;
    private de: string;
    private ate: string;

    constructor(
        espectadorList: InfoEspectador[] = []
    ) {
        this.espectadorList = espectadorList;
    }

    public setHorarioDe(de: string) {
        this.de = de;
    }

    public setHorarioAte(ate: string) {
        this.ate = ate;
    }

    public setDispositivosOnline(num: number) {
        this.dispOnline = num;
    }

    public setPessoasOnline(num: number) {
        this.pessoasOnline = num;
    }

    public setPessoasTemplo(num: number) {
        this.pessoasTemplo = num;
    }

    private getContentHeader(): Content {
        return [{
            margin: [20, 5, 20, 20],
            stack: [
                {
                    margin: [0,10,0,0],
                    columns: [
                        {
                            text: `DATA: ${new Date().toLocaleDateString()}`,
                            fontSize: 16,
                            color: '#3410a7', 
                            bold: true,
                            alignment: 'left',
                            width: '*'
                        }, 
                        {
                            text: `HORÁRIO: De ${this.de} até ${this.ate}`,
                            fontSize: 16,
                            color: '#3410a7', 
                            bold: true,
                            alignment: 'right',
                            width: 'auto'
                        }
                    ]
                },
                {
                    text: `Dispositivos: ${this.dispOnline}`,
                    fontSize: 16,
                    color: '#3410a7', 
                    bold: true,
                    alignment: 'left',
                },
                {
                    text: `Número Aproximado de pessoas (ONLINE): ${this.pessoasOnline}`,
                    fontSize: 16,
                    color: '#3410a7', 
                    bold: true,
                    alignment: 'left',
                },
                {
                    text: `Número Aproximado de pessoas (TEMPLO): ${this.pessoasTemplo}`,
                    fontSize: 16,
                    color: '#3410a7', 
                    bold: true,
                    alignment: 'left',
                }
            ]
        }]
    }

    private getEspectadorTable(): ContentTable {
        const brasil = this.espectadorList.filter(espec => espec.tipo == 'MEMBRO BRASIL');
        const exterior = this.espectadorList.filter(espec => espec.tipo == 'MEMBRO EXTERIOR');
        const pastores = this.espectadorList.filter(espec => espec.tipo == 'PASTOR');
        const missionarios = this.espectadorList.filter(espec => espec.tipo == 'MISSIONARIO');

        return {
            margin: [20,0,20,20],
            table: {
                widths: ['*', 'auto'],
                headerRows: 1,
                body: [
                    [{text:'Nome',fontSize: 13, bold: true},{text:'Localidade',fontSize: 13, bold: true}],
                    ...this.getSubLista('Pastores', pastores),
                    ...this.getSubLista('Missionários', missionarios),
                    ...this.getSubLista('Irmãos no Exterior', exterior),
                    ...this.getSubLista('Irmãos no Brasil', brasil),
                ]
            }
        }
    }

    private getSubLista(title: string, list: InfoEspectador[]) {
        if(list.length > 0) {
            const titleLine = [{text: title, fontSize: 13, bold: true, alignment: 'center', colSpan: 2}, {}];
            const otherLines = list.map(person => [{text: person.nome, alignment: 'left'},{text: person.localidade, alignment: 'left'}]);
            const response = [titleLine, ...otherLines];
            return response;
        } else {
            return [];
        }
    }

    getContent(): Content {
        return [
            this.getContentHeader(),
            this.getEspectadorTable()
        ]
    }

    getHeader(currPage: number, pageCount: number): Content {
        return  [
            {
                margin: [0,10,0,0],
                text: 'Lista de Transmissão', 
                fontSize: 24, 
                color: '#3410a7', 
                bold: true,
                alignment: 'center'
            }
        ]
    }

    getFooter(currPage: number, pageCount: number): Content {
        return [
            {
                margin: [0,0,20,0],
                columns: [
                    {
                        text: `${currPage}/${pageCount}`,
                        alignment: 'right',
                        color: '#818cf8', //Tailwind Indigo 400
                        fontSize: 12,
                        
                    }
                ]
            }
        ]
    }
    
}
