import { Component, OnInit } from '@angular/core';
import { FacultadService } from 'src/app/servicios/facultad.service';
import { Entidad } from 'src/app/modals/entidad';

@Component({
  selector: 'app-materias-profesor',
  templateUrl: './materias-profesor.component.html',
  styleUrls: ['./materias-profesor.component.scss']
})
export class MateriasProfesorComponent implements OnInit {

  materias = [];
  profesor = {} as Entidad;
  constructor(private facultadService : FacultadService) { 
    this.profesor = JSON.parse(localStorage.getItem("usuario_logueado"));
  }

  ngOnInit() {
    this.facultadService.materiaRef.valueChanges().subscribe(datos =>{
      datos.forEach(element=>{
        if(element.profesor == this.profesor.correo){
          this.materias.push(element);
        }
      })
    })
  }

}
