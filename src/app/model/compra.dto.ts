import { RefDTO } from "./ref.dto";
import { ItemCompraDTO } from "./item-compra.dto";

export interface CompraDTO{
    idpedido:RefDTO;
    fornecedor:RefDTO;
    enderecoDeEntrega:RefDTO;
    itens : ItemCompraDTO[];
}