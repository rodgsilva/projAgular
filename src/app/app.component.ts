import { Component } from '@angular/core';
import { SharedService } from './services/shared.service';
import { ClienteService } from './services/cliente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showTemplate : boolean =false;
  public shared:SharedService;
 
  constructor(
    private userService: ClienteService
  ){
    this.shared = SharedService.getInstace();

  }

  ngOnInit(){
    this.shared.showTemplate.subscribe(
      show => this.showTemplate = show
    )
    this.showTemplate = this.shared.isLoggerdIn();
  }

showContentWrapper(){
  return{
    'content-wrapper' : this.shared.isLoggerdIn()
  }
}  
ngOnDestroy(){
  this.userService.logout();
  this.shared.showTemplate.emit(false);
}

}
