import { Injectable } from '@angular/core';
import { CompraDTO } from '../model/compra.dto';
import { SP_API } from './sp.api';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PedidoCompraService {

  constructor(public http: HttpClient) {
  }

  insert(obj: CompraDTO) {
      return this.http.post(
          `${SP_API.baseUrl}/compras`,
          obj,
          {
              observe: 'response',
              responseType: 'text'
          }
      );
  }

}
