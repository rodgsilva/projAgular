import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { FornecedorDTO } from '../model/fornecedorDTO';
import { SP_API } from './sp.api';
import { EnderecoDTO } from '../model/enderecoDTO';
import { FornecedorNewDTO } from '../model/FornecedorNewDTO';
import { Observable } from 'rxjs';

@Injectable()
export class FornecedorService {

  constructor(
    private http:HttpClient,
    public storage:SharedService
  ) { }

  createClienteNewDTO(user:FornecedorDTO){
    return this.http.post(`${SP_API.baseUrl}/fornecedor`,user);

}
updateClienteDTO(user:FornecedorNewDTO){
return this.http.put(`${SP_API.baseUrl}/fornecedor/${user.id}`,user);

}
updateEnderecoDTO(end:EnderecoDTO){
return this.http.put(`${SP_API.baseUrl}/enderecos/${end.id}`,end);
}
createEnderecoDTO(end:EnderecoDTO){
return this.http.post(`${SP_API.baseUrl}/enderecos/`,end);
}
deleteEnderecoDTO(id:string){
return this.http.delete(`${SP_API.baseUrl}/enderecos/${id}`);
}
findbyIdEnderecoDTO(id:string){
return this.http.get(`${SP_API.baseUrl}/enderecos/${id}`);
}

findAll(page:number,count:number): Observable<FornecedorNewDTO[]>{
return this.http.get<FornecedorNewDTO[]>(`${SP_API.baseUrl}/fornecedor/page?page=${page}&linesPerPage=${count}`);
}
findbyId(id:string){
return this.http.get(`${SP_API.baseUrl}/fornecedor/${id}`);
}
delete(id:string){
return this.http.delete(`${SP_API.baseUrl}/fornecedor/${id}`);
}
findbyIdEmpresa(id:string){
  return this.http.get(`${SP_API.baseUrl}/fornecedor/empresa/${id}`);
  }

}
