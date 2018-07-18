import { ParcelaFinaceiroPagarDTO } from "./parcela-financeiropagar";
import { RefDTO } from "./ref.dto";

export interface FinanceiroPagarDTO{
    id:RefDTO,
    financeiroPagarParcela: ParcelaFinaceiroPagarDTO[],
    valorTotal: number
}