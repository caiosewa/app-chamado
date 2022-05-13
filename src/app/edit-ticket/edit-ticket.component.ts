import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AxiosError } from 'axios';
import api from 'src/services/api';
import { Globals } from '../model/Globals';
import { Message } from '../model/mensage';
import { Ticket } from '../model/ticket';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css'],
  providers: [Globals]
})
export class EditTicketComponent implements OnInit {

  ticketEditable = new Ticket(0, 0, "", 0, "", "", "", 0, 0, "", "");
  isAdmin: Boolean = false;
  priority: any = "";
  headers = {}
  answer: string = "";
  isClose: Boolean = false;
  operators: Array<Usuario> = [];
  statusList= [{"id":1, "status": "Aberto"}, {"id":2, "status": "Em andamento"}, {"id":3, "status": "Encerrado"}]

  messages: Array<Message> = [];

  constructor(public router: Router) { }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async ngOnInit(): Promise<void> {
    if(localStorage.getItem("token")){
      if(localStorage.getItem("role") == "Gerente" || localStorage.getItem("role") == "Analista"){
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }
      if(localStorage.getItem("idTicket")){
        this.headers ={"Token": localStorage.getItem("token")}
        api.get("ticket/" + Number(localStorage.getItem("idTicket")), {headers: this.headers})
        .then(response => {
          Globals.TICKET = response.data
          this.statusList.forEach(statusItem => {
            if(statusItem.id == Globals.TICKET.statusId){
              Globals.TICKET.status = statusItem.status
            }
          });
        }).catch(error => {
          if (error){
            this.router.navigate(['/login']);
          }
        })
      }
      await this.delay(1000)
      localStorage.setItem("idTicket", String(Globals.TICKET.idTicket))
      if (Globals.TICKET) {
        this.ticketEditable = Globals.TICKET
        this.headers ={"Token": localStorage.getItem("token")}
        api.get('ticketMessages/'+this.ticketEditable.idTicket, {headers: this.headers})
        .then(response => {
          this.messages = response.data;
          this.messages.forEach(element => {
            element.nameUser = element.nameUser.split(" ")[0]
          });
        }).catch(error => {
          if (error){
            this.router.navigate(['/login']);
          }
        })
        if(this.ticketEditable.status == 'Encerrado'){
          this.isClose = true;
        }else{
          this.isClose = false;
          api.get('User/list/2', {headers: this.headers})
          .then(response => {
            this.operators = response.data;
          }).catch(error => {
            if (error){
              this.router.navigate(['/login']);
            }
          })
        }
        // this.mensages = [{ "user": this.ticketEditable.idCliente, "text":"Olá, boa noite, poderia me informar mais informações sobre o problema?"}, {"user": this.ticketEditable.idCliente , "text":"Boa noite! Já informei!"}]

        var baixa = <HTMLInputElement> document.getElementById('baixa')
        var media = <HTMLInputElement> document.getElementById('media')
        var alta = <HTMLInputElement> document.getElementById('alta')
        var imediata = <HTMLInputElement> document.getElementById('imediata')

        if(this.ticketEditable.priority == Number(baixa.value)){
          baixa.checked = true;
          media.checked = false;
          alta.checked = false;
          imediata.checked = false;
        }
        if(this.ticketEditable.priority == Number(media.value)){
          baixa.checked = false;
          media.checked = true;
          alta.checked = false;
          imediata.checked = false;
        }
        if(this.ticketEditable.priority == Number(alta.value)){
          baixa.checked = false;
          media.checked = false;
          alta.checked = true;
          imediata.checked = false;
        }
        if(this.ticketEditable.priority == Number(imediata.value)){
          baixa.checked = false;
          alta.checked = false;
          media.checked = false;
          imediata.checked = true;
        }
      }
    }else{
      this.router.navigate(['/login'])
    }
  }

  enviarMensagem() {
    if (this.isClose == false){
      var mensagem = {
        "idTicket": 0,
        "message": "string"
      }
      mensagem.idTicket = Number(this.ticketEditable.idTicket)
      mensagem.message = this.answer
      this.answer = ""
      api.post('ticketMessages', mensagem, {headers: this.headers})
      .then(response => {
        alert("MENSAGEM ENVIADA COM SUCESSO!")
        window.location.assign('/edit-ticket')
      }).catch(error => {
        if (error){
          this.router.navigate(['/login']);
        }
      })
    }
  }

  encerrarChamado() {
    if (this.isClose == false){
      this.ticketEditable.statusId = 3
      var edit = {"idOperator": this.ticketEditable.idOperator, "statusId": this.ticketEditable.statusId}
      console.log(edit)
      api.patch('ticket/' + this.ticketEditable.idTicket, edit, {headers: this.headers})
      .then(response => {
        console.log(response)
        localStorage.setItem("idTicket", String(response.data['idTicket']))
        var mensagem = {
          "idTicket": 0,
          "message": "string"
        }
        mensagem.idTicket = Number(this.ticketEditable.idTicket)
        mensagem.message = "Seu chamado foi encerrado! Caso tenha algum outro problema, por favor, abra um novo ticket!"
        api.post('ticketMessages', mensagem, {headers: this.headers})
        .then(response => {
          window.location.assign('/edit-ticket')
        }).catch(error => {
          if (error){
            this.router.navigate(['/login']);
          }
        })
      }).catch(error => {
        if (error){
          this.router.navigate(['/login']);
        }
      })
    }else {
      alert("ESTE CHAMADO JÁ ESTÁ ENCERRADO!")
    }
  }

  salvarChamado() {
    if (this.isClose == false){
      if (this.ticketEditable.idOperator) {
        this.ticketEditable.statusId = 2
      }
      localStorage.setItem("idTicket", String(this.ticketEditable.idTicket))
      var edit = {"idOperator": this.ticketEditable.idOperator, "statusId": this.ticketEditable.statusId}
      api.patch('ticket/' + this.ticketEditable.idTicket, edit, {headers: this.headers})
      .then(response => {
        localStorage.setItem("idTicket", String(response.data['idTicket']))
        window.location.reload()
      }).catch(error => {
        if (error){
          this.router.navigate(['/login']);
        }
      })
    } else {
      alert("ESTE CHAMADO JÁ ESTÁ ENCERRADO!")
    }
  }

  atribuirChamado() {

  }

  getOperator(event: any){
    this.ticketEditable.idOperator = Number(event.target.value);
  }

  onlyOne(event: any) {

    var baixa = <HTMLInputElement> document.getElementById('baixa')
    var media = <HTMLInputElement> document.getElementById('media')
    var alta = <HTMLInputElement> document.getElementById('alta')
    var imediata = <HTMLInputElement> document.getElementById('imediata')
    this.priority = event.target.value;
    this.ticketEditable.priority = Number(this.priority);

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
