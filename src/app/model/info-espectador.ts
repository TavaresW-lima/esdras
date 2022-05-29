export class InfoEspectador {
    private static ID_COUNTER = 0;

    constructor(
        nome: string, 
        localidade: string, 
        nomeacao: TipoEspectador = 'MEMBRO BRASIL', 
    ) {
        this.id = InfoEspectador.ID_COUNTER;
        this.nome = nome;
        this.localidade = localidade;
        this.tipo = nomeacao;
        InfoEspectador.ID_COUNTER++;
    }

    id: number;
    nome: string | null;
    localidade?: string | null;
    tipo?: TipoEspectador;
}

export type TipoEspectador = 'PASTOR' | 'MISSIONARIO' | 'MEMBRO BRASIL' | 'MEMBRO EXTERIOR';