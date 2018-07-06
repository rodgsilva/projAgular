import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/security/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ClienteService } from './services/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from './services/shared.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthInterceptorProvider } from './interceptors/auth-interceptor';
import { ClientesComponent } from './components/clientes/clientes.component';
import { AuthGuard } from './components/security/auth.guard';
import { DialogService } from './util/dialog.service';
import { ClienteNovoComponent } from './components/clientes/cliente-novo/cliente-novo.component';
import { ClienteEnderecoComponent } from './components/clientes/cliente-endereco/cliente-endereco.component';
import { ClienteEditComponent } from './components/clientes/cliente-edit/cliente-edit.component';
import { CampoControlErroComponent } from './util/campo-control-erro/campo-control-erro.component';
import { ComprasEditComponent } from './components/entrada/compras-edit/compras-edit.component';
import { ComprasListaComponent } from './components/entrada/compras-lista/compras-lista.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ComprasPedidoComponent } from './components/entrada/compras-pedido/compras-pedido.component';
import { CategoriaService } from './services/categoria.service';
import { ProdutoService } from './services/produto.service';
import { CartService } from './services/cart.service';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ClientesComponent,
    ClienteNovoComponent,
    ClienteEnderecoComponent,
    ClienteEditComponent,
    CampoControlErroComponent,
    ComprasEditComponent,
    ComprasListaComponent,
    ProdutosComponent,
    CategoriasComponent,
    ComprasPedidoComponent,
    CartComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ClienteService,
    SharedService,
    AuthInterceptorProvider,
    DialogService,
    AuthGuard,
    CategoriaService,
    ProdutoService,
    CartService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
