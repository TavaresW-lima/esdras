import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InfoEspectador, TipoEspectador } from '../model/info-espectador';

@Component({
  selector: 'app-coletor',
  templateUrl: './coletor.component.html',
  styleUrls: ['./coletor.component.scss']
})
export class ColetorComponent {

  @ViewChild('inputNome') public inputNome: ElementRef<HTMLInputElement>;

  public nomeList: InfoEspectador[] = [];

  public form: Partial<InfoEspectador> = {
    tipo: 'MEMBRO BRASIL'
  }
 
  constructor() { }

  setNomeacao(selecionado: boolean, nomeacao: TipoEspectador) {
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
    this.inputNome.nativeElement.focus();
  }

}

