import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FinanceiroPagarDTO } from '../model/financeiropagar.dto';
import { SP_API } from './sp.api';

@Injectable()
export class FinanceiroPagarService {

  constructor(
    private http:HttpClient
  ) { }

  insert(id:string,documento:FinanceiroPagarDTO){
    return this.http.post(`${SP_API.baseUrl}/financeiro/${id}/parcelado`,documento,
    {
      observe: 'response',
      responseType: 'text'
  });

  }

}
