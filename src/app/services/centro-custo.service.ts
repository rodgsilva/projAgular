import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SP_API } from './sp.api';
import { Observable } from '../../../node_modules/rxjs';
import { CentroRateioDTO } from '../model/centro-rateio';


@Injectable()
export class CentroCustoService {

  constructor(
    private http:HttpClient
  ) { }

  findRateioAll() : Observable <CentroRateioDTO[]> {
    return this.http.get<CentroRateioDTO[]>(`${SP_API.baseUrl}/centrocusto/rateio`)
  }

}
