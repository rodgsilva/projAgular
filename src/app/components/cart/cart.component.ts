import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { CartItem } from '../../model/cart-item';
import { CartService } from '../../services/cart.service';
import { ProdutoDTO } from '../../model/produto.dto';
import { CompraDTO } from '../../model/compra.dto';
import { Router } from '@angular/router';
import { PedidoCompraService } from '../../services/pedido-compra.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnChanges, OnInit {
 
  @Input() novoProd:string;
  @Input() idFornecedor:string;
  valorT:number;
  items: CartItem[] =[];
  @Input() addProd:boolean=false;
  pedido:CompraDTO;
  codpedido: string;

  constructor(
    private router: Router,
    private cartService:CartService,
    private pedidoService:PedidoCompraService
  ) { }

  ngOnInit() {
    let cart = this.cartService.getCart();
   // this.items = cart.items;
   // this.loadImageUrls();
   console.log("Cart Id fornecedor")
   console.log(this.idFornecedor)

  }
  ngOnChanges() {
    
    let cart = this.cartService.getCart();
    this.items = cart.items;
    
  }
  removeItem(iditem:string,nomeitem:string,precoitem:number) {
    let produto: ProdutoDTO={
      id :iditem,
      nome :nomeitem,
      preco :precoitem
       }
    this.addProd = false;
    this.items = this.cartService.removeProduto(produto).items;
    console.log(produto.id)

  }
  increaseQuantity(iditem:string,nomeitem:string,precoitem:number) {
    let produto: ProdutoDTO={
      id :iditem,
      nome :nomeitem,
      preco :precoitem
       }
    this.items = this.cartService.increaseQuantity(produto).items;
  }
  
  atualizavalor(iditem:string,nomeitem:string,valor) {
    let produto: ProdutoDTO={
      id :iditem,
      nome :nomeitem,
      preco :valor,

       }
       this.valorT=valor;
    this.items = this.cartService.atualizavalor(produto).items;
  }

  decreaseQuantity(iditem:string,nomeitem:string,precoitem:number) {
    let produto: ProdutoDTO={
      id :iditem,
      nome :nomeitem,
      preco :precoitem
       }
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  total() : number {
    return this.cartService.total();
  }  
  confirme(){
    let cart = this.cartService.getCart();
    this.pedido = {
      idpedido: null,
      fornecedor:{id: this.idFornecedor},
      enderecoDeEntrega : {id: "1"},
      itens : cart.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id},preco: x.produto.preco}})
    }
    
 //  console.log(this.pedido)
    this.pedidoService.insert(this.pedido)
        .subscribe(response => {
          let total:string=this.total().toString();
          this.cartService.createOrClearCart();
          this.codpedido = this.extractId(response.headers.get('location'));
          console.log("Pedido de Comprea ID")
          console.log(this.codpedido)
          
          this.router.navigate(['/comprapagamento', {pedido: this.codpedido, total}]);
        },
        error => {
          if (error.status == 403) {
           
          }
        });
    }
  
    private extractId(location : string) : string {
      let position = location.lastIndexOf('/');
      return location.substring(position + 1, location.length);
    }
  
 
}
