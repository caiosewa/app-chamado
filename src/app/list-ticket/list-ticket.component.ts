import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import api from 'src/services/api';
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

  headers = {}
  ticket = new Ticket(0, 0, "", 0, "", "", "", 0, 0, "", "");

  roles= [{"id": 1, "role": "Gerente"}, {"id": 2, "role": "Analista"}, {"id": 3, "role": "Cliente"}]
  statusList= [{"id":1, "status": "Aberto"}, {"id":2, "status": "Em andamento"}, {"id":3, "status": "Encerrado"}]
  prioridades= [{"id":0, "prioridade": "Baixa"}, {"id":1, "prioridade": "Média"}, {"id":2, "prioridade": "Alta"}, {"id":3, "prioridade": "Imediata"}]

  isAdmin: boolean = false;
  isGerente: boolean = false;
  notFound: boolean = false;
  idvalue: any;
  tickets: Array<Ticket> = [];
  ticketsPesquisados: Array<Ticket> = [];
  ticketsByOperator: Array<Ticket> = [];


  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("token")){
      this.headers ={"Token": localStorage.getItem("token")}

      if(localStorage.getItem("role") == "Gerente" || localStorage.getItem("role") == "Analista"){
        this.isAdmin = true;
        api.get('ticket/list', {headers: this.headers})
        .then(response => {
          this.tickets = response.data;
          this.ticketsPesquisados = response.data;
          this.tickets.forEach(ticket => {
            this.statusList.forEach(statusItem => {
              if(statusItem.id == ticket.statusId){
                ticket.status = statusItem.status
              }
            });
            this.prioridades.forEach(prioridade => {
              if(prioridade.id == ticket.priority){
                ticket.namePriority = prioridade.prioridade
              }
            });
          });
        }).catch(error => {
          if (error){
            this.router.navigate(['/login']);
          }
        })
      }else{
        this.isAdmin = false;
        api.get('ticket/list/' + localStorage.getItem('idUser'), {headers: this.headers})
        .then(response => {
          this.tickets = response.data;
          this.ticketsPesquisados = response.data;
          this.tickets.forEach(ticket => {
            this.statusList.forEach(statusItem => {
              if(statusItem.id == ticket.statusId){
                ticket.status = statusItem.status
              }
            });
            this.prioridades.forEach(prioridade => {
              if(prioridade.id == ticket.priority){
                ticket.namePriority = prioridade.prioridade
              }
            });
          });
      }).catch(error => {
        if (error){
          this.router.navigate(['/login']);
        }
      })
      }
    }else{
      this.router.navigate(['/login'])
    }
    if(localStorage.getItem("role") == 'Gerente'){
      this.isGerente = true;
    }
  }

  editTicket(ticket: Ticket){
    Globals.TICKET = ticket
    localStorage.removeItem("idTicket")
    this.router.navigate(['/edit-ticket']);
  }

  clearSearch(){
    this.tickets = this.ticketsPesquisados
    this.idvalue = ""
  }

  listAllTicket() {
    api.get('ticket/list', {headers: this.headers})
      .then(response => {
        this.tickets = response.data;
        this.ticketsPesquisados = response.data;
        this.tickets.forEach(ticket => {
          this.statusList.forEach(statusItem => {
            if(statusItem.id == ticket.statusId){
              ticket.status = statusItem.status
            }
          });
          this.prioridades.forEach(prioridade => {
            if(prioridade.id == ticket.priority){
              ticket.namePriority = prioridade.prioridade
            }
          });
        });
      }).catch(error => {
        if (error){
          this.router.navigate(['/login']);
        }
      })
  }

  listTicketByOperator() {
    api.get('ticket/list/' + localStorage.getItem('idUser'), {headers: this.headers})
    .then(response => {
      this.notFound = false;
      this.tickets = response.data;
      this.ticketsPesquisados = response.data;
      this.tickets.forEach(ticket => {
        this.statusList.forEach(statusItem => {
          if(statusItem.id == ticket.statusId){
            ticket.status = statusItem.status
          }
        });
        this.prioridades.forEach(prioridade => {
          if(prioridade.id == ticket.priority){
            ticket.namePriority = prioridade.prioridade
          }
        });
      });
    }).catch(error => {
      this.tickets = []
      this.ticketsPesquisados = []
      this.notFound = true;
      if (error){
        this.router.navigate(['/login']);
      }
    })
  }

  searchTicket() {
    var ticketEncontrado = [this.ticket];
    this.ticketsPesquisados.forEach((ticketbody) => {
      if (this.idvalue == ticketbody.idTicket) {
        ticketEncontrado = [ticketbody];
      }
    })

    if(ticketEncontrado[0].idTicket == 0){
      this.tickets = []
    }else{
      this.tickets = ticketEncontrado
    }
    if(this.idvalue.length == 0){
      this.tickets = this.ticketsPesquisados
    }
  }
}
