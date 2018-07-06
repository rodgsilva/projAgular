import { Component, OnInit } from '@angular/core';

import { SharedService } from '../../../services/shared.service';
import { ClienteService } from '../../../services/cliente.service';
import { Router } from '@angular/router';
import { CredenciaisDTO } from '../../../model/credenciais.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  };

//user = new User('','');
public shared : SharedService;
message: string;


  constructor(
      private userService:ClienteService,
      private router:Router
  ) {
    this.shared=SharedService.getInstace();
     }

  ngOnInit() {
    
  }
  login(){
    console.log(this.creds);
    this.message='';
    this.userService.login(this.creds)
    .subscribe(response=>{
   this.userService.successfulLogin(response.headers.get('Authorization'));
   this.shared.showTemplate.emit(true);
   this.router.navigate(['/']);
    },
    error =>{this.userService.logout();
      this.shared.showTemplate.emit(false);
      this.message='erro'});
    
  }
  cancellogin(){
      this.userService.logout();
      this.shared.showTemplate.emit(false);
  }
  getFromGrupClass(isInvalid:boolean,isDirty):{}{
    return {
      'form-group' : true,
      'has-error' : isInvalid && isDirty,
      'has-success' : !isInvalid && isDirty
    }
  }

}
