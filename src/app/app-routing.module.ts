import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
//import { ClienteNewDTO } from './model/cliente';
import { LoginComponent } from './components/security/login/login.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { AuthGuard } from './components/security/auth.guard';
import { ClienteNovoComponent } from './components/clientes/cliente-novo/cliente-novo.component';
import { ClienteEditComponent } from './components/clientes/cliente-edit/cliente-edit.component';
import { ClienteEnderecoComponent } from './components/clientes/cliente-endereco/cliente-endereco.component';
import { ComprasPedidoComponent } from './components/entrada/compras-pedido/compras-pedido.component';

let routes = [
  {path : "" , component :HomeComponent,canActivate:[AuthGuard]},
  {path : "home" , component :HomeComponent,canActivate:[AuthGuard]},
  {path : "listacliente" , component :ClientesComponent,canActivate:[AuthGuard] },
  {path : "novocliente" , component :ClienteNovoComponent },
  {path : "editcliente/:id" , component :ClienteEditComponent,canActivate:[AuthGuard] },
  {path : "enderecocliente/:id" , component :ClienteEnderecoComponent,canActivate:[AuthGuard] },
  {path : "pedidocompras" , component :ComprasPedidoComponent,canActivate:[AuthGuard] },
 // {path : "cliente/:id" , component :Cliente },
  {path : "login" , component :LoginComponent },
  {path : "**" , redirectTo : "/home"}];


@NgModule({
  exports: [ RouterModule ],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
