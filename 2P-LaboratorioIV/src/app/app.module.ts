import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './componentes/registro/registro.component';
//Firebase
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { BarraComponent } from './componentes/barra/barra.component';
import { MateriasComponent } from './componentes/materias/materias.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { FiltroComponent } from './componentes/filtro/filtro.component';
import { UsuariosFiltroComponent } from './componentes/usuarios-filtro/usuarios-filtro.component';
import { DescargaComponent } from './componentes/descarga/descarga.component';
import { InscripcionComponent } from './componentes/inscripcion/inscripcion.component';
import { ColorCeldaPipe } from './pipes/color-celda.pipe';
import { MateriasProfesorComponent } from './componentes/materias-profesor/materias-profesor.component';
import { MenuChatComponent } from './componentes/menu-chat/menu-chat.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { MiCaptchaComponent } from './componentes/mi-captcha/mi-captcha.component';
import { RecaptchaModule } from 'ng-recaptcha';
@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent,
    BarraComponent,
    MateriasComponent,
    UsuariosComponent,
    FiltroComponent,
    UsuariosFiltroComponent,
    DescargaComponent,
    InscripcionComponent,
    ColorCeldaPipe,
    MateriasProfesorComponent,
    MenuChatComponent,
    ChatComponent,
    MiCaptchaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RecaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
