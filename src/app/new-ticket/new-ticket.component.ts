import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit {

  titulo: string = "";
  mensage: string = "";
  priority: any = "";

  _errorTitulo: string = "";
  _errorMensage: string = "";

  tituloDig: number = 0;

  checked: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  abrirChamado(){
    if(this.titulo.length == 0) {
      this._errorTitulo = "Campo Obrigatório"
    }else{
      this._errorTitulo = ""
    }
    if(this.mensage.length == 0) {
      this._errorMensage = "Campo Obrigátorio"
    }else{
      this._errorMensage = ""
    }
  }

  countCaracter() {
    this.tituloDig = this.titulo.length
  }

  onlyOne(event: any) {

    var baixo = <HTMLInputElement> document.getElementById('baixo')
    var normal = <HTMLInputElement> document.getElementById('normal')
    var urgente = <HTMLInputElement> document.getElementById('urgente')
    this.priority = event.target.value;

    if(this.priority == baixo.value){
      normal.checked = false;
      urgente.checked = false;
    }
    if(this.priority == normal.value){
      baixo.checked = false;
      urgente.checked = false;
    }
    if(this.priority == urgente.value){
      normal.checked = false;
      baixo.checked = false;
    }

}

}
