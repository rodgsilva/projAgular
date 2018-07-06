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
  novo :number =1;
  produto: ProdutoDTO;

 

  constructor(
    private produtoService:ProdutoService,
    private cartService:CartService,
   ) { 
   }

  ngOnInit() {
    this.loadData();
    
  }

  ngOnChanges() {
   console.log('ngOnChanges');
  this.loadData();
  }

  loadData() {
   this.items=[];
    this.produtoService.findByCategoria(this.catId, this.page, 10)
      .subscribe(response => {
      //  let start = this.items.length;
        this.items = this.items.concat(response['content']);
       // let end = this.items.length - 1;
       
        console.log(this.page);
        console.log(this.items);
    
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


}
