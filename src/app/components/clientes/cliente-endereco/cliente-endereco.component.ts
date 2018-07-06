import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';


@Component({
  selector: 'app-cliente-endereco',
  templateUrl: './cliente-endereco.component.html',
  styleUrls: ['./cliente-endereco.component.css']
})
export class ClienteEnderecoComponent implements OnInit,OnDestroy {
  formGroup:FormGroup;
  message:{};
  classCss:{};
  mostraEnd:boolean=true;
  @Input() id:string;
  @Input() clienteId:string;
  @Input() nome:string;
  public shared:SharedService;
  dados;

 
 
  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.formGroup = this.formBuilder.group({
      id:[null],
      clienteId:[null],
      logradouro:[null,[Validators.required]],
      complemento:[null],
      bairro:[null],
      cidadeId:[null],
      numero:[null],
      cep:[null,[Validators.required]]
    
    });
  }

  ngOnInit() {
    //let id : string = this.route.snapshot.params['id'];
    if(this.id != undefined){
       this.findbyId(this.id);
    }
 
  }
  ngOnDestroy(){
    this.dados.unsubscribe();
  }
  atualizaEnd(){

    if(this.id != undefined){
      this.findbyId(this.id);
    
  /*  this.formGroup.patchValue({
      id:this.id,
      logradouro:this.logradouro,
      complemento:this.complemento,
      bairro:this.bairro,
      numero:this.numero,
      cep:this.cep
      
    })*/
    //console.log(this.logradouro);
 // }
  }


  }

  findbyId(id:string){
   
    this.dados=  this.clienteService.findbyIdEnderecoDTO(id)  
    .subscribe(dados => this.carregaForm(dados));
  }

  carregaForm(dados){
   // this.formGroup.reset;
    this.formGroup.patchValue({
      id:dados.id,
      clienteId:this.clienteId,
      logradouro:dados.logradouro,
      complemento:dados.complemento,
      bairro:dados.bairro,
      cidadeId:dados.cidadeId,
      numero:dados.numero,
      cep:dados.cep
    })
    
     
}

  

register(){
   if (this.formGroup.valid) {
      this.message={};
      if(this.id != undefined){
      this.clienteService.updateEnderecoDTO(this.formGroup.value)
      .subscribe(response =>{
          this.formGroup.reset();
          this.showMessage({
            type:'success',
            text: 'Atualizado com Sucesso'
         });
    
  }, err => {
    this.showMessage({
      type:'error',
      text: err['error']['errors'][0]
    });
  });
}else{
  this.formGroup.patchValue({
    clienteId:this.clienteId
  });
  this.clienteService.createEnderecoDTO(this.formGroup.value)
      .subscribe(response =>{
          this.formGroup.reset();
          this.showMessage({
            type:'success',
            text: 'Atualizado com Sucesso'
         });
    
  }, err => {
    this.showMessage({
      type:'error',
      text: err['error']['errors'][0]
    });
  });

}
     
  } else {
    console.log('formulario invalido');
    this.verificaValidacoesForm(this.formGroup);
  }
  //console.log(this.clienteId);
  this.router.navigate(['/editcliente',this.clienteId]);

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
