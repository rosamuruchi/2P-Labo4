import { Component, OnInit, Input } from '@angular/core';
import { Entidad } from 'src/app/modals/entidad';
import { Materia } from 'src/app/modals/materia';
import { FacultadService } from 'src/app/servicios/facultad.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent implements OnInit {
  materia : Materia = {nombre : "" ,cuatrimestre : 1 , cupos : 1 , alumnos : []};
  profesores = [];
  materias = [];
  disabled : boolean = true;
  constructor(private facultadService : FacultadService) { }

  ngOnInit() {
    this.facultadService.usuarios().subscribe(data =>{
      console.log(data);
      data.forEach(element=>{
         if(element.perfil == "profesor"){
            this.profesores.push(element);
         }
         console.log(this.profesores);
      })
   })
   this.facultadService.materias().subscribe(data =>{
     this.materias = data;
     console.log(this.materias);
   })
  }
  agregarMateria(){
    console.log(this.materia);
    this.facultadService.agregarMateria(this.materia);
  }
  verificar(event){
    console.log(event);
    if(event !== null){
     this.disabled = false;
    }
    else{
      console.log("Ya no es valido");
      this.disabled = true;
    }
  }

}
