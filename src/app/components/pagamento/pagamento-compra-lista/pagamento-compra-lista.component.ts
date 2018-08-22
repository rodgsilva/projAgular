import { Component, OnInit } from '@angular/core';
import { FinanceiroPagarService } from '../../../services/financeiro-pagar.service';

import { ParcelaFinaceiroPagarDTO } from '../../../model/parcela-financeiropagar';
import { CentroCustoService } from '../../../services/centro-custo.service';

@Component({
  selector: 'app-pagamento-compra-lista',
  templateUrl: './pagamento-compra-lista.component.html',
  styleUrls: ['./pagamento-compra-lista.component.css']
})
export class PagamentoCompraListaComponent implements OnInit {
  page:number=0;
  count:number=5;
  pages:Array<number>;
  financeiros:any;
  parcelaFincs:Array<any>;
  documento:ParcelaFinaceiroPagarDTO;
  dataPagamento:string;


  constructor(
    private financeiroService: FinanceiroPagarService,
    private centroCustoService: CentroCustoService ) { }

  ngOnInit() {
    this.listar(this.page,this.count);
  }
  mostraParcela(id:string){
    this.financeiroService.FindOne(id)
    .subscribe(response =>{
      this.parcelaFincs=[];
      this.parcelaFincs =  this.parcelaFincs.concat(response[0]['financeiroPagarParcela']);
      console.log( this.parcelaFincs);
    })
  }
  listar(page:number,count:number){
    this.financeiros=[];
  
    this.financeiroService.findAll(page,count)
    .subscribe(response =>{
      console.log(response);
       this.financeiros = this.financeiros.concat(response['content']);
       this.pages =new Array (response['totalPages']);
     
    },
    error =>{
    
    });
  }  
  pagaParcela(idDoc:string,dtPag:string){
    console.log("passou Click")
    this.documento={
      id: idDoc,
      dataPagamento:dtPag ,
      dataVencimento:null,
      numeroDocumento:null,
      valorParcela:null      
    };
  
    this.financeiroService.pagaParcela(this.documento.id,this.documento)
      .subscribe(response=>{
        console.log(response);
        console.log("passou Click 2")
      })

  }

  setNextpage(event:any){
    event.preventDefault();
    if(this.page + 1 < this.pages.length){
      this.page = this.page + 1;
      //this.listar(this.page,this.count);
    }
  }
  setPreviousPage(event:any){
    event.preventDefault();
    if(this.page > 0 ){
      this.page = this.page - 1;
     // this.listar(this.page,this.count);
    }
  }

  setPage(i,event:any){
    event.preventDefault();
      this.page = i;
    //  this.listar(this.page,this.count);
    
  }

}
