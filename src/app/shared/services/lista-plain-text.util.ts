import { Injectable } from "@angular/core";
import { InfoEspectador, TipoEspectador } from '../../model/info-espectador';

@Injectable({providedIn: 'root'})
export class ListaPlainTextUtilService {

    constructor() {}

    public async lerLista(file: File, separator: string = ';'): Promise<InfoEspectador[]> {
        const fullText = await file.text();
        const lines = this.fullTextToLines(fullText);
        const espectadores = this.linesToEspectador(lines, separator);
        return espectadores;
    }

    private fullTextToLines(text: string): string[] {
        return text.split('\r\n');
    }

    private linesToEspectador(lines: string[], separator: string): InfoEspectador[] {
        let espectadorList: InfoEspectador[] = [];
        let marcadorAtual: TipoEspectador = 'PASTOR';
        for(let line of lines) {
            const lineContent = line.trim();
            const regex = /^[0-9]+/g;
            const empty = lineContent == '';
            const startWithNumber = regex.test(lineContent);
            if(empty || startWithNumber) continue;
            switch(lineContent) {
                case 'PASTORES':
                    marcadorAtual = 'PASTOR';
                    break;
                case 'MISSIONÁRIOS': 
                    marcadorAtual = 'MISSIONARIO';
                    break;
                case 'IRMÃOS NO EXTERIOR':
                    marcadorAtual = 'MEMBRO EXTERIOR';
                    break;
                case 'IRMÃOS NO BRASIL':
                    marcadorAtual = 'MEMBRO BRASIL';
                    break;
                default:
                    const [nome, localidade] = line.split(separator);
                    const espectador: InfoEspectador = new InfoEspectador(nome, localidade.trim(), marcadorAtual);
                    espectadorList.push(espectador);
                    break;
            }            
        }

        return espectadorList;
    }

    public getFileFromLista(espectadores: InfoEspectador[], separator: string = ';'): Blob {
        let finalString = '';
        const grupoPastores = espectadores.filter(espectador => espectador.tipo == 'PASTOR');
        const grupoMissionarios = espectadores.filter(espectador => espectador.tipo == 'MISSIONARIO');
        const grupoExterior = espectadores.filter(espectador => espectador.tipo == 'MEMBRO EXTERIOR');
        const grupoBrasil = espectadores.filter(espectador => espectador.tipo == 'MEMBRO BRASIL') ;

        finalString = finalString.concat('PASTORES\r\n');
        finalString = finalString.concat(...grupoPastores.map(espec => `${espec.nome}${separator} ${espec.localidade}\r\n`));
        finalString = finalString.concat('MISSIONÁRIOS\r\n');
        finalString = finalString.concat(...grupoMissionarios.map(espec => `${espec.nome}${separator} ${espec.localidade}\r\n`));
        finalString = finalString.concat('EXTERIOR\r\n');
        finalString = finalString.concat(...grupoExterior.map(espec => `${espec.nome}${separator} ${espec.localidade}\r\n`));
        finalString = finalString.concat('BRASIL\r\n');
        finalString = finalString.concat(...grupoBrasil.map(espec => `${espec.nome}${separator} ${espec.localidade}\r\n`));

        let blob = new Blob([finalString], {type: 'text/plain'});
        return blob;
    }
}