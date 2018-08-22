import { RefDTO } from "./ref.dto";

export interface ContratoNovoDTO{
    id : RefDTO,
    email:string,
    curso:string,
    dtFechamento :string,
    escola : RefDTO,
    evento : string ,
    periodo : string ,
    turma :  string ,
    tipoContrato : string,
    qtdFormando : number,
    qtdParticipantes : number,
    qtdIdentificado : number,
    comissão : number,
    vlrMulta : number,
    centroCusto : RefDTO,

}