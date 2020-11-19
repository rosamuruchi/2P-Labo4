import { Component, OnInit, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  @Output() cambio = new EventEmitter<any>();
  perfil : string = 'profesor';
  constructor() { }

  ngOnInit() {
   this.cambio.emit(this.perfil);
  }
  cambioPerfil(){
    console.log("hoal");
    console.log(this.perfil);
    this.cambio.emit(this.perfil);
  }

}
