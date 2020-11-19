import { Component, OnInit } from '@angular/core';
import { Entidad } from 'src/app/modals/entidad';
import { FacultadService } from 'src/app/servicios/facultad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  entidad : Entidad = {correo : "",clave : "",perfil :"alumno"};
  mostrar : boolean = false;
  mostrar2 : boolean = false;
  msj : string;
  tipo: string = "password";
  disabled : boolean = true;
  constructor(private facultadService : FacultadService , private router : Router) { 
  }

  ngOnInit() {
  }
  async agregarEntidad(){
    console.log(this.entidad);
    if(this.entidad.correo == "" && this.entidad.clave != ""){
      this.msj = "Por favor, ingrese un correo electrónico";
      this.mostrar = true;
      setTimeout(()=>{
        this.mostrar = false;
      },3000);
    }
    else if(this.entidad.correo != "" && this.entidad.clave == ""){
      this.msj = "Por favor, ingrese una contraseña";
      this.mostrar = true;
      setTimeout(()=>{
        this.mostrar = false;
      },3000);
    }
    else if(this.entidad.correo == "" && this.entidad.clave == ""){
      this.msj = "Por favor, complete los campos correspondientes";
      this.mostrar = true;
      setTimeout(()=>{
        this.mostrar = false;
      },3000);
    }
    else{
       try{
        this.mostrar = false;
        await this.facultadService.agregarEntidad(this.entidad);
        this.mostrar2 = true;
        setTimeout(()=>{
          this.router.navigate(["/login"]);
        },5000);
       }
       catch(e){
        console.log(e.message);
        if(e.message == "The email address is badly formatted."){
          this.mostrar = true;
          this.msj = "Por favor, ingrese un formato de email válido";
          setTimeout(()=>{
            this.mostrar = false;
          },3000);
         }
         else if(e.message == "Password should be at least 6 characters"){
          this.mostrar = true;
          this.msj = "Por favor, ingrese una contraseña de minimo 6 caracteres";
          setTimeout(()=>{
            this.mostrar = false;
          },3000);
         }
         else if(e.message = "The email address is already in use by another account."){
          this.mostrar = true;
          this.msj = "Correo electrónico ya registrado, utilce otro por favor";
          setTimeout(()=>{
            this.mostrar = false;
          },3000);
         }
          
       }
    }
    
  }
  clave(tipo : string){
    console.log("Hola, estoy dentro");
    this.tipo = tipo;
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
