import { Component, OnInit } from '@angular/core';
import { FacultadService } from 'src/app/servicios/facultad.service';
import { Entidad } from 'src/app/modals/entidad';

@Component({
  selector: 'app-menu-chat',
  templateUrl: './menu-chat.component.html',
  styleUrls: ['./menu-chat.component.scss']
})
export class MenuChatComponent implements OnInit {

  materiasPertenecientes = [];
  entidadLogueada = {} as Entidad
  mostrar : boolean = true;
  constructor(private facultadService : FacultadService) { 
    this.entidadLogueada = JSON.parse(localStorage.getItem("usuario_logueado"));
  }

  ngOnInit() {
    this.facultadService.materiaRef.valueChanges().subscribe(data =>{
      data.forEach(element =>{
        if(element.profesor == this.entidadLogueada.correo){
          this.materiasPertenecientes.push(element.nombre);
        }
        else if(this.entidadLogueada.perfil == "administrador"){
          this.materiasPertenecientes.push(element.nombre);
        }
        else{
          element.alumnos.forEach(alumno =>{
            if(alumno == this.entidadLogueada.correo){
              this.materiasPertenecientes.push(element.nombre);
            }
          })
        }
      })
    })
    console.log(this.materiasPertenecientes);
  }
  mostrarDiv(){
    this.mostrar = false;
  }

}
