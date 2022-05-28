import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { InfoEspectador, TipoEspectador } from '../model/info-espectador';

@Component({
  selector: 'app-coletor',
  templateUrl: './coletor.component.html',
  styleUrls: ['./coletor.component.scss']
})
export class ColetorComponent implements OnInit {

  public nomeList: InfoEspectador[] = [
    new InfoEspectador('William Tavares', 'Duque de Caxias'),
    new InfoEspectador('Irmão Gringo', 'França', 'MEMBRO EXTERIOR'),
    new InfoEspectador('Pastor tal', 'Outro lugar', 'PASTOR'),
    new InfoEspectador('Missionário Tal', 'Ainda Outro Lugar', 'MISSIONARIO')
  ];

  public form: Partial<InfoEspectador> = {
    localidade: null,
    nome: null,
    tipo: 'MEMBRO BRASIL'
  }

  constructor() { }

  ngOnInit(): void {
  }

  public setNomeacao(selecionado: boolean, nomeacao: TipoEspectador) {
    if(selecionado) {
      this.form.tipo = nomeacao;
    } else {
      this.form.tipo = 'MEMBRO BRASIL';
    }
  }

  add() {
    if(this.form.nome && this.form.localidade) {
      const espectador: InfoEspectador = new InfoEspectador(this.form.nome, this.form.localidade, this.form.tipo);
      this.nomeList = this.nomeList.concat([espectador]);
    }
    this.form.localidade = null;
    this.form.nome = null;
    this.form.tipo = 'MEMBRO BRASIL';
  }

}

