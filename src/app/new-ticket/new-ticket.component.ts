import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import api from 'src/services/api';
import { Ticket } from '../model/ticket';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit {

  ticketOpened = new Ticket(0, 0, "", 0, "", "", "", 0, 0, "", "");
  headers = {}
  titulo: string = "";
  mensage: string = "";
  priority: any;

  _errorTitulo: string = "";
  _errorMensage: string = "";

  tituloDig: number = 0;

  checked: boolean = false;
  tituloOK: boolean = false;
  descricaoOK: boolean = false;
  prioridadeOK: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.headers ={"Token": localStorage.getItem("token")}
      api.get('user/'+ localStorage.getItem("email"), {headers: this.headers})
      .then(response => {
        this.ticketOpened.idCliente = response.data.idUser
      }).catch(error => {
        if (error){
          this.router.navigate(['/login']);
        }
      })
    } else {
      this.router.navigate(['/login'])
    }
  }

  abrirChamado(){
    if(this.titulo.length == 0) {
      this._errorTitulo = "Campo Obrigatório"
      this.tituloOK = false
    }else{
      this._errorTitulo = ""
      this.ticketOpened.title = this.titulo
      this.tituloOK = true
    }
    if(this.mensage.length == 0) {
      this._errorMensage = "Campo Obrigátorio"
      this.descricaoOK = false
    }else{
      this._errorMensage = ""
      this.ticketOpened.description = this.mensage
      this.descricaoOK = true
    }
    if(this.priority == ""){
      this.prioridadeOK = false
      alert("Selecionar uma prioridade!")
    }else{
      this.prioridadeOK = true
    }
    if(this.tituloOK && this.descricaoOK && this.prioridadeOK){
      var ticketToOpen = {"idCliente": this.ticketOpened.idCliente, "title": this.ticketOpened.title, "description": this.ticketOpened.description, "priority": this.ticketOpened.priority, "statusId": 1}
      this.headers ={"Token": localStorage.getItem("token")}
      api.post('ticket', ticketToOpen, {headers: this.headers})
      .then(response => {
        alert("Ticket aberto- ID - "+response.data.idTicket+", Titulo: "+response.data.title+" --- Anote o ID para consultar o status!")
        this.router.navigate(['/list-ticket'])
      }).catch(error => {
        alert("Error ao inserir ticket, tente logar novamente!")
      });
    }


  }

  countCaracter() {
    this.tituloDig = this.titulo.length
  }

  onlyOne(event: any) {

    var baixa = <HTMLInputElement> document.getElementById('baixa')
    var media = <HTMLInputElement> document.getElementById('media')
    var alta = <HTMLInputElement> document.getElementById('alta')
    var imediata = <HTMLInputElement> document.getElementById('imediata')
    this.priority = event.target.value;

    this.ticketOpened.priority = Number(this.priority)

    if(this.priority == baixa.value){
      media.checked = false;
      alta.checked = false;
      imediata.checked = false;
    }
    if(this.priority == media.value){
      baixa.checked = false;
      alta.checked = false;
      imediata.checked = false;
    }
    if(this.priority == alta.value){
      baixa.checked = false;
      media.checked = false;
      imediata.checked = false;
    }
    if(this.priority == imediata.value){
      baixa.checked = false;
      alta.checked = false;
      media.checked = false;
    }

}

}
