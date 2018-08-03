import { ProdutoDTO } from "./produto.dto";

export interface ItemDTO{
    desconto:number;
    quantidade :number;
    produto : ProdutoDTO;
    preco : number
    subTotal:number
}