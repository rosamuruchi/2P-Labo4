import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './componentes/registro/registro.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { MateriasComponent } from './componentes/materias/materias.component';
import { UsuariosFiltroComponent } from './componentes/usuarios-filtro/usuarios-filtro.component';
import { AdminGuard } from './guards/admin/admin.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { InscripcionComponent } from './componentes/inscripcion/inscripcion.component';
import { AlumnoGuard } from './guards/alumno/alumno.guard';
import { MateriasProfesorComponent } from './componentes/materias-profesor/materias-profesor.component';
import { ProfesorGuard } from './guards/profesor/profesor.guard';
import { MenuChatComponent } from './componentes/menu-chat/menu-chat.component';
import { ChatComponent } from './componentes/chat/chat.component';



const routes: Routes = [
  {path: "" , redirectTo : "login" , pathMatch:"full"},
  {path :"registro" , component: RegistroComponent },
  {path: "home" , component : HomeComponent , canActivate : [AuthGuard], children : [
    {path : "registrar-materia" , component : MateriasComponent,canActivate: [AdminGuard]},
    {path : "usuarios" , component : UsuariosFiltroComponent , canActivate: [AdminGuard]},
    {path : "inscripcion-materia" , component : InscripcionComponent , canActivate :[AlumnoGuard]},
    {path: "materias-profesor" , component:MateriasProfesorComponent , canActivate:[ProfesorGuard]},
    {path : "chat" , component : MenuChatComponent},
  ]},
  {path: "login" , component : LoginComponent},
  {path : "home/chat/:materia" , component : ChatComponent , canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
