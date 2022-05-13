import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import api from 'src/services/api';
import { Globals } from '../model/Globals';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [Globals]
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  logado: boolean = false;
  isAdmin: boolean = false;

  ngOnInit(): void {

    if (localStorage.getItem("token")) {
      this.logado = true;
      if(localStorage.getItem("role") == "Gerente" || localStorage.getItem("role") == "Analista"){
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }
    }else{
      this.logado = false;
    }
  }

  logout(){
    localStorage.removeItem("email")
    localStorage.removeItem("token")
    localStorage.removeItem("name")
    localStorage.removeItem("idRole")
    localStorage.removeItem("role")
    window.location.assign('/login')
  }

}
