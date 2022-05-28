export class InfoEspectador {
    private static ID_COUNTER = 0;

    constructor(
        nome: string, 
        localidade: string, 
        nomeacao: TipoEspectador = 'MEMBRO BRASIL', 
        exterior = false
    ) {
        this.id = InfoEspectador.ID_COUNTER;
        this.nome = nome;
        this.localidade = localidade;
        this.tipo = nomeacao;
        this.exterior = exterior;
        InfoEspectador.ID_COUNTER++;
    }

    id: number;
    nome: string | null;
    localidade?: string | null;
    tipo?: TipoEspectador;
    exterior: boolean;
}

export type TipoEspectador = 'PASTOR' | 'MISSIONARIO' | 'MEMBRO BRASIL' | 'MEMBRO EXTERIOR';