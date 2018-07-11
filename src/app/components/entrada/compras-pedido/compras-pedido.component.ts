import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FornecedorService } from '../../../services/fornecedor.service';

@Component({
  selector: 'app-compras-pedido',
  templateUrl: './compras-pedido.component.html',
  styleUrls: ['./compras-pedido.component.css']
})
export class ComprasPedidoComponent implements OnInit {
  catId:string;
  novoProd:string;
  id:string;
  constructor(
    private fornecedorService:FornecedorService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params:any)=> {
        this.id = params['id'];
        console.log(this.id);
        console.log("compra pedido")
       } );
    
  }
  onMudouCat(evento){
   // console.log(evento.novoValor);
    this.catId=evento.novoValor;
  }
  onNovoProduto(evento){
    this.novoProd = evento.novoValor;

  }

}
