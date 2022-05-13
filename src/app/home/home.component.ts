import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import api from 'src/services/api';
import { Globals } from '../model/Globals';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [Globals]
})
export class HomeComponent implements OnInit {

  name: any;
  role: any;
  idRole: any ;

  roles= [{"id": 1, "role": "Gerente"}, {"id": 2, "role": "Analista"}, {"id": 3, "role": "Cliente"}]

  // headers = {}
  // usuarioLogado = new Usuario(0 , "", "", 0)

  // setUserGlobal(user: any){
  //   this.usuarioLogado.email = user.data.email
  //   this.usuarioLogado.name = user.data.name
  //   this.usuarioLogado.idRole = user.data.idRole
  //   this.usuarioLogado.idUser = user.data.idUser
  //   Globals.USER = this.usuarioLogado
  //   console.log(Globals.USER)
  // }

  constructor(private router: Router) { }

  ngOnInit(): void {

    if (localStorage.getItem("token")) {
      // this.headers ={"Token": localStorage.getItem("token")}
      // api.get('user/'+ localStorage.getItem("email"), {headers: this.headers})
      // .then(response => {
      //   this.setUserGlobal(response)
      //   if(Globals.USER.email != ""){
      //     console.log(Globals.USER)
      // this.idRole = localStorage.getItem("idRole")
      // this.roles.forEach(element => {
      //     if (element.id == this.idRole) {
      //       this.role = element.role
      //     }
      //   });
        this.role = localStorage.getItem("role")
        this.name = localStorage.getItem("name")
      }else{
        this.router.navigate(['login']);
      }
    //   }).catch(error => {
    //     Globals.USER = new Usuario(0, "", "", 0)
    //     localStorage.removeItem("email")
    //     localStorage.removeItem("token")
    //   })
    // } else {
    //   this.router.navigate(['login']);
    // }

  }

}
