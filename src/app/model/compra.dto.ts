import { RefDTO } from "./ref.dto";
import { ItemCompraDTO } from "./item-compra.dto";

export interface CompraDTO{
    cliente:RefDTO;
    enderecoDeEntrega:RefDTO;
    items : ItemCompraDTO;
}