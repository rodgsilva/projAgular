import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SP_API } from './sp.api';
import { Observable } from '../../../node_modules/rxjs';
import { EscolaPesquisa } from '../model/escola-pesquisa';

@Injectable()
export class ContratoService {

  constructor(
    private http:HttpClient
  ) { }

  pesquisaEscoal(nome:string) :Observable <EscolaPesquisa[]> {
    return this.http.get<EscolaPesquisa[]>(`${SP_API.baseUrl}/escola/pesquisa?value=${nome}`)
  }

  findOn(id:string){
    return this.http.get(`${SP_API.baseUrl}/escola/${id}`)
  }


}
