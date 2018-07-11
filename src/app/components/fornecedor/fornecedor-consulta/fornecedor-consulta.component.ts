import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../util/dialog.service';
import { SharedService } from '../../../services/shared.service';
import { FornecedorService } from '../../../services/fornecedor.service';
import { FornecedorNewDTO } from '../../../model/FornecedorNewDTO';

@Component({
  selector: 'app-fornecedor-consulta',
  templateUrl: './fornecedor-consulta.component.html',
  styleUrls: ['./fornecedor-consulta.component.css']
})
export class FornecedorConsultaComponent implements OnInit {
  @Input() id:string;
  formGroup:FormGroup; 
  shared:SharedService;
  fornecedor:FornecedorNewDTO;
  
  constructor(
    private fornecedorService:FornecedorService,
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

  })
   }

  ngOnInit() {
    this.findById(this.id)

  }
  findById(id:string){
    this.fornecedorService.findbyId(id)
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
      cpfOuCnpj:dados.cpfOuCnpj,
    })
 
}

}
