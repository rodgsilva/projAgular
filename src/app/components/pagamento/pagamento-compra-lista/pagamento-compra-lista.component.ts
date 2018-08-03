import { Component, OnInit } from '@angular/core';
import { FinanceiroPagarService } from '../../../services/financeiro-pagar.service';

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

  constructor(
    private financeiroService: FinanceiroPagarService
  ) { }

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
