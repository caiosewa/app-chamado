import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit {

  tickets = [
              {"id":1, "titulo":"Teste 01", "status":"Aberto", "prioridade":"Alta"},
              {"id":2, "titulo":"Teste 02", "status":"Fechado", "prioridade":"Normal"},
              {"id":3, "titulo":"Teste 03", "status":"Em andamento", "prioridade":"Urgente"}
            ];

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

}
