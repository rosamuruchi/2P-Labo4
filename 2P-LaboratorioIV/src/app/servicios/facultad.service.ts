import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth'
import { Entidad } from '../modals/entidad';
import { Materia } from '../modals/materia';
import { Router } from '@angular/router';
import { Mensaje } from '../modals/mensaje';
@Injectable({
  providedIn: 'root'
})
export class FacultadService {

  
  entidadref : AngularFirestoreCollection<Entidad>;
  materiaRef : AngularFirestoreCollection<Materia>;
  chatRef    : AngularFirestoreCollection<Mensaje>;
  constructor(private bd : AngularFirestore, private auth : AngularFireAuth , private router : Router) { 
     this.entidadref = this.bd.collection("entidades");
     this.materiaRef = this.bd.collection("materias");
     this.chatRef = this.bd.collection("mensajes",ref => ref.orderBy("fecha","asc").orderBy("hora","asc"));
  }
  async agregarEntidad(obj : Entidad){
      try{
         let resultado = await this.auth.auth.createUserWithEmailAndPassword(obj.correo,obj.clave);
         console.log(resultado);
         this.entidadref.add(obj);
      }
      catch(e){
         throw e;
      }
  }
  async iniciarSesion(obj:Entidad){
     try{
        let result = await this.auth.auth.signInWithEmailAndPassword(obj.correo,obj.clave);
        result.user.getIdToken().then(data =>{
           localStorage.setItem("token" , data);
           this.guardarEntidadLogueada(obj);
        })
     }
     catch(e){
        throw e;
     }
  }
  usuarios(){
    return this.entidadref.valueChanges();
  }
  agregarMateria(obj:Materia){
    this.materiaRef.add(obj);
  }
  materias(){
   return this.materiaRef.valueChanges();
  }
  guardarEntidadLogueada(obj : Entidad){
      this.usuarios().subscribe(data =>{
        console.log(data);
        data.forEach(element=>{
         if(element.correo == obj.correo){
            localStorage.setItem("usuario_logueado",JSON.stringify(element));
            if(element.perfil == "administrador"){
               this.router.navigate(["home/registrar-materia"]);
            }
            else if(element.perfil == "profesor"){
               this.router.navigate(["home/materias-profesor"]);
            }
            else if(element.perfil == "alumno"){
               this.router.navigate(["home/inscripcion-materia"]);
            }
         }
        })
   })
  }
  inscribirse(materia : Materia){
    this.materiaRef.doc(materia.id).set(materia);
  }
  agregarMsj(obj : Mensaje){
     this.chatRef.add(obj);
  }
}
