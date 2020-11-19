import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree , Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoGuard implements CanActivate {
  constructor(private router : Router){
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(JSON.parse(localStorage.getItem("usuario_logueado")).perfil == "alumno"){
        return true;
     }
     else{
         this.router.navigate(["/home"]);
     } 
  }
  
}
