import { Injectable } from '@angular/core';
import { SP_API } from './sp.api';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from '../model/credenciais.dto';
import { LocalUser } from '../model/local_user';
import { SharedService } from './shared.service';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { ClienteDTO } from '../model/clienteDTO';
import { ClienteNewDTO } from '../model/cliente';
import { EnderecoDTO } from '../model/enderecoDTO';

@Injectable()
export class ClienteService {

  jwtHelper:JwtHelper =new JwtHelper();
 
  constructor(
    private http:HttpClient,
    public storage:SharedService) { }

  login(creds:CredenciaisDTO){//authenticate
    return this.http.post(`${SP_API.baseUrl}/login`,creds,
        {
          observe:'response',
          responseType:'text'
        });
  }
  successfulLogin(authorizationValue:String){
      let tok =authorizationValue.substring(7);
      let user : LocalUser={
        token:tok,
        email: this.jwtHelper.decodeToken(tok).sub
      };
      this.storage.setLocalUser(user);
 
  }
  logout(){
    this.storage.setLocalUser(null);
  }

  createClienteNewDTO(user:ClienteNewDTO){
        return this.http.post(`${SP_API.baseUrl}/clientes`,user);
    
  }
  updateClienteDTO(user:ClienteDTO){
    return this.http.put(`${SP_API.baseUrl}/cliente/${user.id}`,user);

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

  findAll(page:number,count:number): Observable<ClienteDTO[]>{
    return this.http.get<ClienteDTO[]>(`${SP_API.baseUrl}/clientes/page?page=${page}&linesPerPage=${count}`);
  }
  findbyId(id:string){
    return this.http.get(`${SP_API.baseUrl}/clientes/${id}`);
  }
  delete(id:string){
    return this.http.delete(`${SP_API.baseUrl}/clientes/${id}`);
  }

}
