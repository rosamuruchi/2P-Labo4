import { Component, OnInit } from '@angular/core';
import { FacultadService } from 'src/app/servicios/facultad.service';
import { map } from 'rxjs/operators';
import { Materia } from 'src/app/modals/materia';
import { element } from 'protractor';
import { NgLocaleLocalization } from '@angular/common';
import { Entidad } from 'src/app/modals/entidad';
@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {

  materias = [];
  materiasInsc = [];
  materia = {};
  materiasRef;
  usuarioLogueado : Entidad;
  mostrar : boolean = false;
  msj : string;
  constructor(private facultadService : FacultadService) { 
    this.usuarioLogueado = JSON.parse(localStorage.getItem("usuario_logueado"));
  }

  ngOnInit() {
    this.materiasRef = this.facultadService.materiaRef.snapshotChanges().pipe(map(actions =>{
      return actions.map(a =>{
        const data = a.payload.doc.data() as Materia;
        data.id = a.payload.doc.id;
        return data;

      })
    }));
    this.materiasRef.subscribe(data=>{
       this.materiasInsc = [];
       this.materias = data;
       console.log(this.materias);
       this.materias.forEach(element =>{
         for(let i = 0 ; i<element.alumnos.length;i++){
           if(element.alumnos[i] == this.usuarioLogueado.correo){
             this.materiasInsc.push(element)
           }
         }
       })
    })
  }
  inscribirse(item : Materia){
    console.log(item);
    let flag = 0;
    if(item.cupos > 0){
    this.materias.forEach(element =>{
      if(element.nombre == item.nombre){
        for(let i = 0 ; i<element.alumnos.length;i++){
          if(element.alumnos[i] == this.usuarioLogueado.correo){
            console.log("Hola"); 
            flag = 1;
          } 
        }
      }
      
    });
    console.log(flag);
    if(flag == 0){
      item.alumnos.push(this.usuarioLogueado.correo);
      item.cupos = item.cupos - 1;
      this.facultadService.inscribirse(item);
    }
    else{
      console.log("Ya estas inscripto a esta materia");
      this.msj = "Ya estas inscripto a " + item.nombre;
      this.mostrar = true;
      setTimeout(() => {
         this.mostrar = false;
      }, 2000);
    }
   } 
   else{
    console.log("No hay cupos");
    this.msj = "No hay cupos para la materia " + item.nombre;
    this.mostrar = true;
    setTimeout(() => {
         this.mostrar = false;
      }, 2000);
   }
  }


}
