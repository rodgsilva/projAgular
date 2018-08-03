import { ParcelaFinaceiroPagarDTO } from "./parcela-financeiropagar";
import { RefDTO } from "./ref.dto";

export interface FinanceiroPagarNewDTO{
    id:string,
    financeiroPagarParcela: ParcelaFinaceiroPagarDTO[],
    valorTotal: number,
    estadoPagamento:string,
}