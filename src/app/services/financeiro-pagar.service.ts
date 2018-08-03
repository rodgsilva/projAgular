import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FinanceiroPagarDTO } from '../model/financeiropagar.dto';
import { SP_API } from './sp.api';
import { Observable } from '../../../node_modules/rxjs';
import { findLocaleData } from '../../../node_modules/@angular/common/src/i18n/locale_data_api';

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
  /*findAll(){
    return this.http.get(`${SP_API.baseUrl}/financeiro`);
  }*/
  findAll(page:number,count:number){
    return this.http.get(`${SP_API.baseUrl}/financeiro/page?page=${page}&linesPerPage=${count}`);
  }
FindOne(id:string){
  return this.http.get(`${SP_API.baseUrl}/financeiro/${id}`)
}

}
