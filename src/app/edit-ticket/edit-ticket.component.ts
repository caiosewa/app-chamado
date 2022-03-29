import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../model/Globals';
import { Ticket } from '../model/ticket';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css'],
  providers: [Globals]
})
export class EditTicketComponent implements OnInit {

  ticketEditable = new Ticket("", "", "", "", "", "");
  priority: any = "";

  answer: string = "";

  mensages = [{ "user": "AnalistaX", "text":"Olá, boa noite, poderia me informar mais informações sobre o problema?"}, {"user": "", "text":"Boa noite! Já informei!"}]

  constructor(public router: Router) { }

  ngOnInit(): void {
    if (Globals.ticket) {
      this.ticketEditable = Globals.ticket

      this.mensages = [{ "user": "AnalistaX", "text":"Olá, boa noite, poderia me informar mais informações sobre o problema?"}, {"user": this.ticketEditable.solicitante.split(" ")[0], "text":"Boa noite! Já informei!"}]

      var baixo = <HTMLInputElement>document.getElementById('baixo')
      var normal = <HTMLInputElement>document.getElementById('normal')
      var urgente = <HTMLInputElement>document.getElementById('urgente')

      console.log(this.ticketEditable)
      if (this.ticketEditable.prioridade == baixo.value) {
        normal.checked = false;
        urgente.checked = false;
        baixo.checked = true;
      }
      if (this.ticketEditable.prioridade == normal.value) {
        baixo.checked = false;
        urgente.checked = false;
        normal.checked = true;
      }
      if (this.ticketEditable.prioridade == urgente.value) {
        normal.checked = false;
        baixo.checked = false;
        urgente.checked = true;
      }
    }
  }

  enviarMensagem() {
    var mensagem = { "user": "QUALQUER", "text": ""}
    mensagem.text = this.answer
    this.mensages.push(mensagem)
    this.answer = ""
  }
  salvarChamado() {
    console.log(this.ticketEditable)
  }

  onlyOne(event: any) {

    var baixo = <HTMLInputElement>document.getElementById('baixo')
    var normal = <HTMLInputElement>document.getElementById('normal')
    var urgente = <HTMLInputElement>document.getElementById('urgente')

    this.priority = event.target.value;

    if (this.priority == baixo.value) {
      normal.checked = false;
      urgente.checked = false;
    }
    if (this.priority == normal.value) {
      baixo.checked = false;
      urgente.checked = false;
    }
    if (this.priority == urgente.value) {
      normal.checked = false;
      baixo.checked = false;
    }

  }

}
