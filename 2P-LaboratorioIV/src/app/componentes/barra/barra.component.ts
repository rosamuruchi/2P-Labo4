import { Component, OnInit, Input } from '@angular/core';
import { Entidad } from 'src/app/modals/entidad';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.scss']
})
export class BarraComponent implements OnInit {
  entidad : Entidad = {correo: "" , clave : "" , perfil : ""};
  esProfesor: boolean = false;
  esAdmin : boolean = false;
  esAlumno : boolean = false;
  constructor() { }

  ngOnInit() {
    this.entidad= JSON.parse(localStorage.getItem("usuario_logueado"));

    if(this.entidad.perfil == "administrador"){
      this.esAdmin = true;
    }
    else if(this.entidad.perfil == "profesor"){
      this.esProfesor = true;
    }
    else if(this.entidad.perfil == "alumno"){
      this.esAlumno = true;
    }
  }

}
