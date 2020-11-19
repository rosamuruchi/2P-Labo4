import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios-filtro',
  templateUrl: './usuarios-filtro.component.html',
  styleUrls: ['./usuarios-filtro.component.scss']
})
export class UsuariosFiltroComponent implements OnInit {

  perfil : string;
  constructor() { }

  ngOnInit() {
  }
  cambiarPerfil(event){
    this.perfil = event;
  }

}
