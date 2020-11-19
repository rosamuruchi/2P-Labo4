import { Component, OnInit , Input } from '@angular/core';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');


@Component({
  selector: 'app-descarga',
  templateUrl: './descarga.component.html',
  styleUrls: ['./descarga.component.scss']
})
export class DescargaComponent implements OnInit {

  @Input() idHtml;
  constructor() { }

  ngOnInit() {
  }
  descargar(extension :  string){
    console.log(this.idHtml)
    let doc = new jsPDF('l', 'pt');
    doc.autoTable({html : '#miTabla'});
    doc.save('table.' + extension);
  }


}
