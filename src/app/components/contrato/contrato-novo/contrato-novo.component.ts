import { Component, OnInit } from '@angular/core';
import { ContratoNovoDTO } from '../../../model/contrato-novo';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { SharedService } from '../../../services/shared.service';
import { ContratoService } from '../../../services/contrato.service';

@Component({
  selector: 'app-contrato-novo',
  templateUrl: './contrato-novo.component.html',
  styleUrls: ['./contrato-novo.component.css']
})
export class ContratoNovoComponent implements OnInit {
  contrato:ContratoNovoDTO;
  formGroup:FormGroup;
  shared:SharedService;
  message:{};
  classCss:{};

  constructor(
    private contratoService:ContratoService,
    private formBuilder: FormBuilder
  ) {
    this.shared = SharedService.getInstace();
    this.formGroup = this.formBuilder.group({
    escola: [null,[Validators.required]],
    curso: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(12)]],
    email:[null,[Validators.required,Validators.email]],
    tipoContrato: [null,[Validators.required]],
    evento: [null,[Validators.required,Validators.minLength(4),Validators.maxLength(12)]],
    periodo:[null,[Validators.required]]  ,
    turma: [null,[Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
    qtdFormando: [null,[Validators.required]],
    qtdParticipantes:[null],
    qtdIdentificado: [null],
    comissao: [null],
    vlrMulta:[null,[Validators.required]],
    centroCusto:[null]

   });
  }
  ngOnInit() {
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
