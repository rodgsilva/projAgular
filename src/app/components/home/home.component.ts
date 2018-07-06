import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public shared:SharedService;
  showTemplate : boolean =false;
  constructor() { 
    this.shared = SharedService.getInstace();
  }

  ngOnInit() {
    this.shared.showTemplate.subscribe(
      show => this.showTemplate = show
    )
  }

}
