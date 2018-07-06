import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProdutoDTO } from '../model/produto.dto';
import { SP_API } from './sp.api';


@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) { }

  findById(produto_id : string) {
    return this.http.get<ProdutoDTO>(`${SP_API.baseUrl}/produtos/${produto_id}`);
  }

  findByCategoria(categoria_id : string, page : number = 0, linesPerPage : number = 12) {
    return this.http.get(`${SP_API.baseUrl}/produtos/?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`);
  }

 /* getSmallImageFromBucket(id : string) : Observable<any> {
    let url = `${SP_API.bucketBaseUrl}/prod${id}-small.jpg`
    return this.http.get(url, {responseType : 'blob'});
  }  

  getImageFromBucket(id : string) : Observable<any> {
    let url = `${SP_API.bucketBaseUrl}/prod${id}.jpg`
    return this.http.get(url, {responseType : 'blob'});
  } */

}
