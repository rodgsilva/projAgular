import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteNewDTO } from '../../../model/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from '../../../util/dialog.service';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-cliente-novo',
  templateUrl: './cliente-novo.component.html',
  styleUrls: ['./cliente-novo.component.css']
})
export class ClienteNovoComponent implements OnInit {

  @ViewChild("from")
  from:NgForm;

  clientes :  ClienteNewDTO;
  formGroup:FormGroup;
  shared:SharedService;
  message:{};
  classCss:{};

  constructor(
    private clienteService:ClienteService,
    private formBuilder: FormBuilder,
    ) { 
    this.shared = SharedService.getInstace();
    this.formGroup = this.formBuilder.group({
    nome: [null,[Validators.required,Validators.minLength(5),Validators.maxLength(120)]],
    email:[null,[Validators.required,Validators.email]],
    tipo: [null,[Validators.required]],
    cpfOuCnpj: [null,[Validators.required,Validators.minLength(11),Validators.maxLength(14)]],
    senha:[null,[Validators.required]]  ,
    logradouro: [null,[Validators.required]],
    numero: [null,[Validators.required]],
    complemento:[null],
    bairro: [null],
    cep: [null,[Validators.required]],
    telefone1:[null,[Validators.required]],
    telefone2:[null,[]],
    telefone3:[null,[]],
    
    cidadeId:[null,[Validators.required]]
  });
}

  ngOnInit() {
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
 

}
