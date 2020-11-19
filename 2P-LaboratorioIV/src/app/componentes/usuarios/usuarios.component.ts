import { FacultadService } from './../../servicios/facultad.service';
import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios = [];
  @Input() perfil : string = "profesor";
  constructor(private facultadService : FacultadService) { }

  ngOnInit() {
    console.log("Estoy6 en el change");
    this.facultadService.usuarios().subscribe(datos =>{
       this.usuarios = datos;
    })
  }

}
