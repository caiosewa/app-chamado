import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../model/Globals';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css'],
  providers: [Globals]
})
export class EditTicketComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    console.log(Globals.ticket)
  }

  get(){
    console.log(Globals.ticket)
  }

}
