import { Component, OnInit } from '@angular/core';
import { FacultadService } from 'src/app/servicios/facultad.service';
import { Entidad } from 'src/app/modals/entidad';
import { ActivatedRoute } from '@angular/router';
import { Mensaje } from 'src/app/modals/mensaje';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  mensajes = []
  entidadLogueada = {} as Entidad;
  sala : string;
  msj : string;
  constructor(private facultadService : FacultadService , private route : ActivatedRoute) { 
    this.entidadLogueada = JSON.parse(localStorage.getItem("usuario_logueado"));
    this.sala =  this.route.snapshot.paramMap.get('materia');
    console.log(this.sala)
  }

  ngOnInit() {
    this.facultadService.chatRef.valueChanges().subscribe(data =>{
      this.mensajes = [];
      data.forEach(element =>{
        element.fecha = this.cambiarFormatoFecha(element.fecha);
        this.mensajes.push(element);
      })
    })
  }
  crearMsj(){
    console.log(this.msj)
    if(this.msj != ""){
     let fecha = new Date();
     let msj : Mensaje = {
       salaNombre : this.sala,
       remitente : this.entidadLogueada.correo,
       mensaje : this.msj,
       hora : this.agregarCero(fecha.getHours()) + ":" + this.agregarCero(fecha.getMinutes()),
       fecha : fecha.getFullYear() + "/" + this.agregarCero((fecha.getUTCMonth() + 1)) + "/" + this.agregarCero(fecha.getDate()),

     }
    this.facultadService.agregarMsj(msj);
     this.msj = "";
   }
  }
  agregarCero(numero : number){
    let retorno = String(numero);
    if(numero <10){
       retorno = "0" + numero;
     }
     return retorno;
  }
  cambiarFormatoFecha(fecha : string){
    let obj = new Date(fecha);
    let nuevoFormato = this.agregarCero(obj.getDate()) + "/" + this.agregarCero((obj.getUTCMonth() + 1)) + "/" + obj.getFullYear();
    return nuevoFormato;
  }

}
