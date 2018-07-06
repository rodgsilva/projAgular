import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaDTO } from '../../model/categoria.DTO';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  
  items : CategoriaDTO[];
  @Output() mudouCat = new EventEmitter();

  constructor(
    public categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.categoriaService.findAll()
    .subscribe(response => {
      this.items = response;
    },
    error => {});
  }
  cat(idCat:string){
    //console.log(idCat);
    this.mudouCat.emit({novoValor: idCat});

  }

}
