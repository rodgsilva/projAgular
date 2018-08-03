import { Component, OnInit } from '@angular/core';
import { PedidoCompraService } from '../../../services/pedido-compra.service';
import { ListaCompraDTO } from '../../../model/listaCompraDTO';
import { ItemDTO } from '../../../model/item.DTO';
import { element } from '../../../../../node_modules/protractor';

@Component({
  selector: 'app-compras-lista',
  templateUrl: './compras-lista.component.html',
  styleUrls: ['./compras-lista.component.css']
})
export class ComprasListaComponent implements OnInit {
  compras:ListaCompraDTO[]=[];
  page:number=0;
  count:number=5;
  pages:Array<number>;
  mostraItem:boolean;
  st:string;
  itens:any=[];
  constructor(
    private servicePedido :PedidoCompraService
  ) { }

  ngOnInit() {
    this.listar(this.page,this.count);
  }

  listar(page:number,count:number){
    this.compras=[];
    this.itens=[];
    this.servicePedido.findAll(page,count)
    .subscribe(response =>{
       this.compras = this.compras.concat(response['content']);
       this.pages =new Array (response['totalPages']);

 
      console.log(this.compras);
      console.log( this.itens);
    },
    error =>{
    
    });
  }  
item(id:number){
  this.itens=[];
  this.servicePedido.findItemPedido(id)
  .subscribe(response =>{
    this.itens = response;
  })
  
  }
  MostraItem():boolean{
    return this.mostraItem= !this.mostraItem;
    
  }
  aplicaBotao(tipo:boolean){
    if(tipo == true){
      this.st="glyphicon glyphicon-th-list";
    }else{
      this.st="glyphicon glyphicon-th-list";
    }
    return this.st

  }
  setNextpage(event:any){
    event.preventDefault();
    if(this.page + 1 < this.pages.length){
      this.page = this.page + 1;
      this.listar(this.page,this.count);
    }
  }
  setPreviousPage(event:any){
    event.preventDefault();
    if(this.page > 0 ){
      this.page = this.page - 1;
      this.listar(this.page,this.count);
    }
  }

  setPage(i,event:any){
    event.preventDefault();
      this.page = i;
      this.listar(this.page,this.count);
    
  }

  

}
