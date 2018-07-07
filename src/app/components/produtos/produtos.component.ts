import { Component, OnInit, Input, OnChanges, Output, EventEmitter  } from '@angular/core';
import { ProdutoDTO } from '../../model/produto.dto';
import { ProdutoService } from '../../services/produto.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnChanges, OnInit {

  @Output() novoProduto = new EventEmitter();
  @Input() catId:string;
  items:ProdutoDTO[]=[];
  page : number = 0;
  count : number= 5;
  novo :number =1;
  produto: ProdutoDTO;
  pages:Array<number>;

 

  constructor(
    private produtoService:ProdutoService,
    private cartService:CartService,
   ) { 
   }

  ngOnInit() {
    
    this.loadData();
    
  }

  ngOnChanges() {
 
   this.page=0;
  this.loadData();
  }

  loadData() {
   this.items=[];
    this.produtoService.findByCategoria(this.catId, this.page, this.count)
      .subscribe(response => {
      //  let start = this.items.length;
        this.items = this.items.concat(response['content']);
       // let end = this.items.length - 1;
       this.pages =new Array (response['totalPages']);
       // console.log(this.page);
      //  console.log(this.items);
    
      },
      error => {
        
      });
  }
  addToCart(iditem:string,nomeitem:string,precoitem:number){
    console.log("addProduto");
    console.log(iditem);
    this.produto={
      id :iditem,
      nome :nomeitem,
      preco :precoitem
       }
  
    console.log("addProduto2");
    console.log( this.produto);
    this.cartService.addProduto(this.produto);
    this.novo= this.novo++;
    this.novoProduto.emit({novoValor: this.produto.id});
   
    console.log(this.produto.id);   
 
  
  }

  setNextpage(event:any){
    event.preventDefault();
    if(this.page + 1 < this.pages.length){
      this.page = this.page + 1;
     this.loadData();
  }
}
  setPreviousPage(event:any){
    event.preventDefault();
    if(this.page > 0 ){
      this.page = this.page - 1;
      this.loadData();
    }
  }

  setPage(i,event:any){
    event.preventDefault();
      this.page = i;
      this.loadData();

  }

}
