import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../model/Globals';
import { Ticket } from '../model/ticket';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css'],
  providers: [Globals]
})
export class ListTicketComponent implements OnInit {

  ticket = new Ticket("", "", "", "", "", "");
  ticket1 = new Ticket("1","Teste 01", "Descricao do ticket 1", "Aberto", "baixo", "Caio Yuri Mattoso Sewa")
  ticket2 = new Ticket("2","Teste 02", "Descricao do ticket 2", "Fechado", "normal", "Henrique Scansani" )
  ticket3 = new Ticket("3","Teste 03", "Descricao do ticket 3", "Em andamento", "urgente", "Guilherme Barros")

  tickets = [this.ticket1,this.ticket2,this.ticket3];

  usuario = new Usuario("", "", "usuario");
  analista = new Usuario("", "", "analista");
  gerente = new Usuario("", "", "gerente");
  logado = new Usuario("", "", "");

  isAdmin: boolean = false;

  idvalue: string = "";
  ticketId: string = "";

  ticketsPesquisados = [this.ticket1,this.ticket2,this.ticket3]

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.logado = this.usuario
    if (this.logado.typeuser == "analista" || this.logado.typeuser == "gerente") {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  editTicket(ticket: Ticket){
    Globals.ticket = ticket
    console.log(Globals.ticket)
    this.router.navigate(['/edit-ticket']);
  }

  clearSearch(){
    this.tickets = this.ticketsPesquisados
    this.idvalue = ""
  }

  searchTicket() {
    var ticketEncontrado = [this.ticket];
    this.ticketsPesquisados.forEach((ticketbody) => {
      if (this.idvalue == ticketbody.id) {
        ticketEncontrado = [ticketbody];
      }
    })

    if(ticketEncontrado[0].id == ""){
      this.tickets = []
    }else{
      this.tickets = ticketEncontrado
    }
    if(this.idvalue.length == 0){
      this.tickets = this.ticketsPesquisados
    }
  }
}
