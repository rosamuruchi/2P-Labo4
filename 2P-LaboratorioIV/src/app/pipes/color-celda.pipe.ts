import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorCelda'
})
export class ColorCeldaPipe implements PipeTransform {

  transform(value: number): any {
    let aux = String(value)
    if(value > 20){
      console.log("Es mayor a 10");
      aux = aux.replace(aux, '<font color =  "blue">'+ aux + '</font>');
    }
    else if(value > 10){
      aux = String(value);
      console.log("Es mayor a 20");
      aux = aux.replace(aux, '<font color =  "orange">' + aux + '</font>');
    }
    else{
      aux = String(value);
      aux = aux.replace(aux, '<font color =  "black">' + aux + '</font>');
    }
    return aux;
  }

}
