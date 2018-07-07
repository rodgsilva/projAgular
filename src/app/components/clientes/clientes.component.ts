import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ClienteService } from '../../services/cliente.service';
import { ClienteDTO } from '../../model/clienteDTO';
import { SharedService } from '../../services/shared.service';
import { DialogService } from '../../util/dialog.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes:ClienteDTO [] =[];
  page:number=0;
  pages:Array<number>;
  count:number=4;
  showTemplate : boolean =false;
  public shared:SharedService;
  message:{};
  classCss:{};
  

  constructor( 
    private clienteService:ClienteService,
    private router: Router,
    private dialogSerivice: DialogService
  ) {
      this.shared = SharedService.getInstace();
      
     }

  ngOnInit() {
  
    this.findAll(this.page,this.count);

  

  }
 
 
  findAll(page:number,count:number){
    this.clientes=[];
    this.shared.showTemplate.subscribe(
      show => this.showTemplate = show
    )
    this.clienteService.findAll(page,count)
    .subscribe(response => {
      this.clientes = this.clientes.concat(response['content']);
      this.pages =new Array (response['totalPages']);
    },
    err =>{
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }
  edit(id:string){
    this.router.navigate(['/editcliente',id]);
  }

  delete(id:string){
    this.dialogSerivice.confirm('Deseja excluir este cliente?')
    .then((candelete:boolean)=>{
      if(candelete){
        this.message={};
        this.clienteService.delete(id).subscribe(response =>{
          this.showMessage({
            type:'sucess',
            text: 'Record deleted'
          });

          this.findAll(this.page,this.count);
          
        },err => {
          this.showMessage({
            type:'error',
            text: err['error']['errors'][0]
          });
        })
      } 
      });
  }
  setNextpage(event:any){
    event.preventDefault();
    if(this.page + 1 < this.pages.length){
      this.page = this.page + 1;
      this.findAll(this.page,this.count);
    }
  }
  setPreviousPage(event:any){
    event.preventDefault();
    if(this.page > 0 ){
      this.page = this.page - 1;
      this.findAll(this.page,this.count);
    }
  }

  setPage(i,event:any){
    event.preventDefault();
      this.page = i;
      this.findAll(this.page,this.count);
    
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
  getFromGrupClass(isInvalid:boolean,isDirty):{}{
    return {
      'form-group' : true,
      'has-error' : isInvalid && isDirty,
      'has-success' : !isInvalid && isDirty
    }
  }
 

}
