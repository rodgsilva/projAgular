import { Injectable } from '@angular/core';
import { CompraDTO } from '../model/compra.dto';
import { SP_API } from './sp.api';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { ListaCompraDTO } from '../model/listaCompraDTO';

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

  findAll(page:number,count:number): Observable<ListaCompraDTO[]>{
    return this.http.get<ListaCompraDTO[]>(`${SP_API.baseUrl}/compras/page?page=${page}&linesPerPage=${count}`);
  }

  findItemPedido(id:number){
    return this.http.get(`${SP_API.baseUrl}/compras/${id}/produto`);
  }

}
