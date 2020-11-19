import { Component, OnInit } from '@angular/core';
import { Entidad } from 'src/app/modals/entidad';
import { FacultadService } from 'src/app/servicios/facultad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  entidad : Entidad = {correo : "" , clave : "" , perfil : ""};
  mostrar : boolean = false;
  mostrar2 : boolean = false;
  msj : string;
  tipo: string = "password";
  constructor(private facultadService : FacultadService, private router : Router) { }

  ngOnInit() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario_logueado");
  }
  async iniciarSesion(){
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
        await this.facultadService.iniciarSesion(this.entidad);
        this.mostrar2 = true;
        setTimeout(()=>{
          //this.router.navigate(["/home"]);
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
         else if(e.message == "The password is invalid or the user does not have a password."){
          this.mostrar = true;
          this.msj = "Contraseña incorrecta";
          setTimeout(()=>{
            this.mostrar = false;
          },3000);
         }
         else if(e.message == "The email address is already in use by another account."){
          this.mostrar = true;
          this.msj = "Correo electrónico ya registrado, utilce otro por favor";
          setTimeout(()=>{
            this.mostrar = false;
          },3000);
         }
         else if(e.message == "There is no user record corresponding to this identifier. The user may have been deleted."){
          this.mostrar = true;
          this.msj = "Datos incorrectos, esta usted registrado?";
          setTimeout(()=>{
            this.mostrar = false;
          },3000);
         }
          
       }
    }
  }
  clave(tipo : string){
    this.tipo = tipo;
  }

}
