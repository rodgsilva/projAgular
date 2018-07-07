import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compras-pedido',
  templateUrl: './compras-pedido.component.html',
  styleUrls: ['./compras-pedido.component.css']
})
export class ComprasPedidoComponent implements OnInit {
  catId:string;
  novoProd:string;
  constructor() { }

  ngOnInit() {
  }
  onMudouCat(evento){
   // console.log(evento.novoValor);
    this.catId=evento.novoValor;
  }
  onNovoProduto(evento){
    this.novoProd = evento.novoValor;

  }

}
