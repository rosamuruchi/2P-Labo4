import { Component, OnInit, Output } from '@angular/core';
import { Entidad } from 'src/app/modals/entidad';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  entidadLogueada : Entidad ;
  constructor() { }

  ngOnInit() {
   this.entidadLogueada = JSON.parse(localStorage.getItem("usuario_logueado"));
   console.log(this.entidadLogueada);
  }
  

}
