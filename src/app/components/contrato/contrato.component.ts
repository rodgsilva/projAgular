import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {
idEscola:string;
campos:boolean=false;
  constructor() { }

  ngOnInit() {
  this.campos=false;

  }

  onMudouCat(evento){

  }

  onEscola(evento){
    this.campos=true;
    this.idEscola=evento.novoValor;
  
  }
  onTrocaEscola(evento){
    this.campos=false;
  
  }

}
