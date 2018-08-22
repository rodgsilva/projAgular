import { Component, OnInit, Output,EventEmitter  } from '@angular/core';
import { EscolaPesquisa } from '../../../../model/escola-pesquisa';
import { ContratoService } from '../../../../services/contrato.service';
import { } from 'events';

@Component({
  selector: 'app-contrato-pesquisa',
  templateUrl: './contrato-pesquisa.component.html',
  styleUrls: ['./contrato-pesquisa.component.css']
})
export class ContratoPesquisaComponent implements OnInit {

escolas:EscolaPesquisa[];
nomeEscola;
@Output() escolaId = new EventEmitter();
@Output() trocaEscoal = new EventEmitter();

  constructor(
    private pesquisaService: ContratoService
  ) { }

  ngOnInit() {
  }

 pesquisa(){

  this.pesquisaService.pesquisaEscoal(this.nomeEscola)
  .subscribe(response =>{
   // this.escolas=[];
    this.escolas =response;
  },
  error => {})
    
  }

  eventEscola(id:string){
    this.escolaId.emit({novoValor: id});
  }

 
 

}
