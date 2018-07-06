import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaDTO } from '../model/categoria.DTO';
import { SP_API } from './sp.api';

@Injectable()
export class CategoriaService {

  constructor(
    public http: HttpClient
  ) { }

  findAll() : Observable<CategoriaDTO[]>  {
    return this.http.get<CategoriaDTO[]>(`${SP_API.baseUrl}/categorias`);
}

}
