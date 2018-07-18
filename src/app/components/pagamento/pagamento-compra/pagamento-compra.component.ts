import { Component, OnInit } from '@angular/core';
import { FinanceiroPagarDTO } from '../../../model/financeiropagar.dto';
import { ParcelaFinaceiroPagarDTO } from '../../../model/parcela-financeiropagar';
import { ActivatedRoute, Router } from '@angular/router';

import { FinanceiroPagarService } from '../../../services/financeiro-pagar.service';

@Component({
  selector: 'app-pagamento-compra',
  templateUrl: './pagamento-compra.component.html',
  styleUrls: ['./pagamento-compra.component.css']
})
export class PagamentoCompraComponent implements OnInit {
 documento:FinanceiroPagarDTO;
 parcelas: Array<ParcelaFinaceiroPagarDTO>=[];
 qtdParcela:number;
 datVenc:Date;
 intervaloDia:number;
 numeroDoc:string;
 pedido;
 total;
 codfinc;
 intervalo:number=1;
 finaliza=false;
  constructor(
    private route: ActivatedRoute,
    private financeiro:FinanceiroPagarService,
    private router: Router
  ) { }

  ngOnInit() {
    this.carregaPedido()
  }

carregaPedido(){
  this.route.params.subscribe(
    (params:any)=> {
      this.pedido = params['pedido'];
      this.total = params['total'];
      console.log("informe pedido")
      console.log(this.pedido)
      console.log(this.total)

    });
}  
geraParcela(){
  let vlparcela:number = this.total / this.qtdParcela;
  this.finaliza=true;

  let datapec:Date = this.datVenc;
 
  for (let i =0; i < this.qtdParcela; i++ ){
   
    let par: number = 1;
    par= par + i;
    let obj = new ParcelaFinaceiroPagarDTO();
   
    let datStr= adicionarDiasData(datapec ,this.intervalo);

    obj.numeroDocumento = this.numeroDoc+"/"+ par.toString();
    obj.valorParcela =vlparcela;

    obj.dataVencimento = datStr;
    this.intervalo = Number(this.intervalo) + Number(this.intervaloDia);
   
    this.parcelas.push(obj);
  }
 
 
 }

cadastrar(){
  console.log(this.pedido)
  this.documento ={
   id: null,
   valorTotal: this.total,
   financeiroPagarParcela: this.parcelas
  }

  this.financeiro.insert(this.pedido,this.documento)
        .subscribe(response => {
          let total:string=this.total().toString();
          
          this.codfinc = this.extractId(response.headers.get('location'));
          console.log("Financeiro a pagar ID")
          console.log(this.codfinc)
          
          //this.router.navigate(['/comprapagamento', {pedido: this.codfinc, total}]);
        },
        error => {
          if (error.status == 403) {
           
          }
        });
        
  
} 

limparParcela(){
  this.parcelas=[];
  this.intervalo =0;
  this.finaliza=false;
}
private extractId(location : string) : string {
  let position = location.lastIndexOf('/');
  return location.substring(position + 1, location.length);
}

}
function adicionarDiasData(data:Date,dias){
  var hoje        = new Date(data);
   var dataVenc    = new Date(hoje.getTime() + (dias * 24 * 60 * 60 * 1000));
  return dataVenc.getDate() + "/" + (dataVenc.getMonth() + 1) + "/" + dataVenc.getFullYear();
}
