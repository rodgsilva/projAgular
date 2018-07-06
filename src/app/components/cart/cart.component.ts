import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { CartItem } from '../../model/cart-item';
import { CartService } from '../../services/cart.service';
import { ProdutoDTO } from '../../model/produto.dto';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnChanges, OnInit {
 
  @Input() novoProd:string;

  items: CartItem[] =[];
  @Input() addProd:boolean=false;
  
  constructor(
    private cartService:CartService
  ) { }

  ngOnInit() {
    let cart = this.cartService.getCart();
   // this.items = cart.items;
   // this.loadImageUrls();
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
  increaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.increaseQuantity(produto).items;
  }

  decreaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  total() : number {
    return this.cartService.total();
  }  

}
