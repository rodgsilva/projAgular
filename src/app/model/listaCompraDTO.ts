import { ItemCompraDTO } from "./item-compra.dto";
import { FornecedorNewDTO } from "./FornecedorNewDTO";
import { EmpresaDTO } from "./empresaDTO";
import { FinanceiroPagarNewDTO } from "./financeiroPagarNewDTO";

export interface ListaCompraDTO{
    id:string;
    financeiroPagar:string;
    fornecedor:string;
    valorTotal:number;
}