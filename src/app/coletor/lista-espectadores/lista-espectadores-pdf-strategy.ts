import { Content, ContentTable } from 'pdfmake/interfaces';
import { PdfMakingStrategy } from '../../shared/pdf/pdf-making-strategy';
import { InfoEspectador } from '../../model/info-espectador';

export class ListaEspectadoresPDFStrategy implements PdfMakingStrategy {

    private espectadorList: InfoEspectador[];
    private dispOnline: number;
    private pessoasOnline: number;
    private pessoasTemplo: number;

    constructor(
        espectadorList: InfoEspectador[] = []
    ) {
        this.espectadorList = espectadorList;
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
            margin: [20, 60, 20, 20],
            columns: [
                {
                    text: `Data: ${new Date().toLocaleDateString()}`,
                    alignment: 'left',
                    width: 'auto'
                }, 
                {
                    text: `Horário: ${new Date(Date.now()).toLocaleTimeString()}`,
                    alignment: 'right',
                    width: 'auto'
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
                    ['Nome', 'Localidade'],
                    [{text:'Pastores', fontSize: 12, bold: true, alignment: 'center', colSpan: 2}, {}],
                    ...pastores.map(pastor => [{text: pastor.nome, alignment: 'left'},{text: pastor.localidade, alignment: 'left'}]),
                    [{text:'Missionários', fontSize: 12, bold: true, alignment: 'center', colSpan: 2}, {}],
                    ...missionarios.map(miss => [{text: miss.nome, alignment: 'left'},{text: miss.localidade, alignment: 'left'}]),
                    [{text:'Irmãos no Exterior', fontSize: 12, bold: true, alignment: 'center', colSpan: 2}, {}],
                    ...exterior.map(membro => [{text: membro.nome, alignment: 'left'},{text: membro.localidade, alignment: 'left'}]),
                    [{text:'Irmãos no Brasil', fontSize: 12, bold: true, alignment: 'center', colSpan: 2}, {}],
                    ...brasil.map(membro => [{text: membro.nome, alignment: 'left'},{text: membro.localidade, alignment: 'left'}])
                ]
            }
        }
    }

    getContent(): Content {
        return [
            this.getContentHeader(),
            this.getEspectadorTable()
        ]
    }

    getHeader(): Content {
        return  [
            { 
                margin:[20,20,20,20],
                columns: [
                    {
                        text: 'Lista de Transmissão',
                        alignment: 'center',
                        width: 100,
                        color: '#4338ca', //Tailwind Indigo 700
                        fontSize: 12
                    }
                ]
            }
        ]
    }

    getFooter(currPage: number, pageCount: number): Content {
        return [
            {
                columns: [
                    {
                        text: `${currPage}/${pageCount}`,
                        alignment: 'right',
                        color: '#818cf8', //Tailwind Indigo 400
                        fontSize: 8
                    }
                ]
            }
        ]
    }
    
}