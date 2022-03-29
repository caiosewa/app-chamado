import { Component, OnInit } from '@angular/core';
import { Ticket } from '../model/ticket';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit {

  ticketOpened = new Ticket("", "", "", "", "", "")

  titulo: string = "";
  mensage: string = "";
  priority: any = "";

  _errorTitulo: string = "";
  _errorMensage: string = "";

  tituloDig: number = 0;

  checked: boolean = false;
  tituloOK: boolean = false;
  descricaoOK: boolean = false;
  prioridadeOK: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  abrirChamado(){
    if(this.titulo.length == 0) {
      this._errorTitulo = "Campo Obrigatório"
      this.tituloOK = false
    }else{
      this._errorTitulo = ""
      this.ticketOpened.titulo = this.titulo
      this.tituloOK = true
    }
    if(this.mensage.length == 0) {
      this._errorMensage = "Campo Obrigátorio"
      this.descricaoOK = false
    }else{
      this._errorMensage = ""
      this.ticketOpened.descricao = this.mensage
      this.descricaoOK = true
    }
    if(this.priority == ""){
      this.prioridadeOK = false
      alert("Selecionar uma prioridade!")
    }else{
      this.prioridadeOK = true
    }
    if(this.tituloOK && this.descricaoOK && this.prioridadeOK){
      this.ticketOpened.status = "Aberto"
      this.ticketOpened.id = "1"
      alert("Ticket aberto- Id: " +this.ticketOpened.id+", Titulo: "+this.ticketOpened.titulo+", Status: "+this.ticketOpened.status+", Prioridade: "+this.ticketOpened.prioridade)
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

    this.ticketOpened.prioridade = this.priority

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
