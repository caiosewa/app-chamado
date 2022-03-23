import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  logado: boolean = false;
  testando: boolean = false;

  ngOnInit(): void {
    var option = 0;
    var test = 1;

    if (option == 0 && test == 1) {
      this.logado = false;
      this.testando = true;
    }
    if (option == 0 && test == 0) {
      this.logado = false;
      this.testando = false;
    }
    if (option == 1 && test == 0) {
      this.logado = true;
      this.testando = false;
    }
  }

}
