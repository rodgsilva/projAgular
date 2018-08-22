import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgModel, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContratoService } from '../../../../services/contrato.service';
import { EscolaPesquisa } from '../../../../model/escola-pesquisa';


@Component({
  selector: 'app-contrato-escola',
  templateUrl: './contrato-escola.component.html',
  styleUrls: ['./contrato-escola.component.css']
})
export class ContratoEscolaComponent implements OnInit {
  @Output() trocaEscoal = new EventEmitter();
  @Input() idEscola:string;
  escolas:EscolaPesquisa;
  formGroup:FormGroup;

  message:{};
  classCss:{};

  constructor(
      private formBuilder: FormBuilder,
      private service:ContratoService
  ) { 
       this.formGroup = this.formBuilder.group({
      nome: [null],
      email:[null],
      nomeReduzido: [null],
      logradouro: [null],
      numero: [null],
      complemento: [null],
      bairro: [null],
      cnpj: [null],
      cep: [null],
  
    });
  }

  ngOnInit() {
   
  }

  ngOnChanges() {
    this.findOn();
  }

  trocarEscola(){
    this.trocaEscoal.emit({novoValor : 1})
  }


  findOn(){
   console.log(this.idEscola);
    this.service.findOn(this.idEscola)
    .subscribe(response =>{
      this.carregaForm(response);
    })
  }

  carregaForm(dados){
    this.formGroup.reset;
    this.formGroup.patchValue({
      id:dados.id,
      nome:dados.nome,
      email:dados.email,
      nomeReduzido:dados.nomeReduzido,
      cnpj:dados.cnpj,
      logradouro:dados.logradouro,
      numero:dados.numero,
      complemento:dados.complemento,
      bairro:dados.bairro,
      cep:dados.cep,
     
    })
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
