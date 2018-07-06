import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';
import { ClienteService } from '../../../services/cliente.service';
import { ClienteDTO } from '../../../model/clienteDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { EnderecoDTO } from '../../../model/enderecoDTO';
import { DialogService } from '../../../util/dialog.service';
import { Telefone } from '../../../model/cliente';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent implements OnInit {

  clientes:ClienteDTO;
  id:string;
  idEnd:string;
  nome:string;
  enderecos:EnderecoDTO[]=[];
  formGroup:FormGroup;
  fromEnd:FormGroup;
  shared:SharedService;
  telefones:Telefone1;
  mostraEnd:boolean=true;
  tipo:string;
  logradouro;
  numero;
  bairro;
  cep;
  cliId;
  st:string;

  
    
  message:{};
  classCss:{};

  constructor(
    private clienteService:ClienteService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialogSerivice: DialogService
    ) { 
    this.shared = SharedService.getInstace();
    this.formGroup = this.formBuilder.group({
    nome: [null,[Validators.required,Validators.minLength(5),Validators.maxLength(120)]],
    email:[null,[Validators.required,Validators.email]],
    cpfOuCnpj: [null,[Validators.required,Validators.minLength(11),Validators.maxLength(14)]],

  });
  this.fromEnd = this.formBuilder.group({
    id:[null],
    logradouro:[null,[Validators.required]],
    bairro:[null],
    cidadeId:[null],
    numero:[null],
    cep:[null,[Validators.required]]
  
  });
}

  ngOnInit() {
    
   if (this.MostraEnd() == true){
    this.MostraEnd();
   }

    this.route.params.subscribe(
      (params:any)=> {
        this.id = params['id'];
        console.log(this.id)
        this.clienteService.findbyId(this.id)  
    .subscribe(dados => this.carregaForm(dados))});


  }
  MostraEnd():boolean{
    return this.mostraEnd= !this.mostraEnd;
    
  }
  aplicaBotao(tipo:boolean){
    if(tipo == true){
      this.st="glyphicon glyphicon-menu-down";
    }else{
      this.st="glyphicon glyphicon-menu-up";
    }
    return this.st

  }

    
 create(){
    this.MostraEnd();
    this.tipo ="Incluir endereço";
 
     //this.router.navigate(['/enderecocliente',id]);
   }
 
  
  edit(id:string){
   this.MostraEnd();
   this.tipo ="Editar o endereço";
   this.idEnd=id;


   //this.router.navigate(['/enderecocliente',id]);
  }


  carregaForm(dados){
    this.formGroup.reset;
    this.enderecos=[];
    this.formGroup.patchValue({
      id:dados.id,
      nome:dados.nome,
   
      email:dados.email,
      cpfOuCnpj:dados.cpfOuCnpj,
    })
    //const idCl = this.formGroup.get("id");
    // this.cliId = idCl;
      this.enderecos = this.enderecos.concat(dados['endereco']);
      this.telefones = dados['telefone'];
      console.log( this.telefones);
     
}

  register(){

    if (this.formGroup.valid) {
        this.message={};
        this.clienteService.createClienteNewDTO(this.formGroup.value)
        .subscribe(response =>{
            this.formGroup.reset();
            this.showMessage({
              type:'success',
              text: 'Cadastrado com Sucesso'
      });
      
    }, err => {
      this.showMessage({
        type:'error',
        text: err['error']['errors'][0]
      });
    });
       
    } else {
      console.log('formulario invalido');
      this.verificaValidacoesForm(this.formGroup);
    }
  }

  
  private showMessage(message:{type:string,text:string}):void{
    this.message =message;
    this.buildClasses(message.type);
    setTimeout(() =>{
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type:string):void{
    this.classCss={
      'alert': true
    }
    this.classCss['alert-'+type] =true;
  }
  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }
  
  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }
  resetar() {
    this.formGroup.reset();
  }

  verificaValidTouched(campo: string) {
    return (
      !this.formGroup.get(campo).valid &&
      (this.formGroup.get(campo).touched || this.formGroup.get(campo).dirty)
    );
  }
  getFromGrupClass(isInvalid:boolean,isDirty):{}{
    return {
      'form-group' : true,
      'has-error' : isInvalid && isDirty,
      'has-success' : !isInvalid && isDirty
    }
  }
  delete(id:string){
    this.dialogSerivice.confirm('Deseja excluir este cliente?')
    .then((candelete:boolean)=>{
      if(candelete){
        this.message={};
        this.clienteService.deleteEnderecoDTO(id).subscribe(response =>{
          this.showMessage({
            type:'sucess',
            text: 'Record deleted'
          });
          this.clienteService.findbyId(this.id)  
          .subscribe(dados => this.carregaForm(dados));
          
        },err => {
          this.showMessage({
            type:'error',
            text: err['error']['errors'][0]
          });
        })
      } 
      });
  }
 

}

export class Telefone1{
  numero:string;
}
