import { Component, OnInit } from '@angular/core';
import api from '../../services/api'
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { Register } from 'src/app/model/register';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';
import { Globals } from '../model/Globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [Globals]
})

export class LoginComponent implements OnInit {

  headers = {}
  roles= [{"id": 1, "role": "Gerente"}, {"id": 2, "role": "Analista"}, {"id": 3, "role": "Cliente"}]
  // usuarioLogado = new Usuario(0 , "", "", 0)

  // setUserGlobal(user: any){
  //   this.usuarioLogado.email = user.data.email
  //   this.usuarioLogado.name = user.data.name
  //   this.usuarioLogado.idRole = user.data.idRole
  //   this.usuarioLogado.idUser = user.data.idUser
  //   Globals.USER = this.usuarioLogado

  // }

  ngOnInit(): void {

    if (localStorage.getItem("token")) {
      this.headers ={"Token": localStorage.getItem("token")}
      api.get('user/'+ localStorage.getItem("email"), {headers: this.headers})
      .then(response => {
        // this.setUserGlobal(response)
        this.router.navigate(['my-profile']);
      }).catch(error => {
        console.log(error)
        // Globals.USER = new Usuario(0, "", "", 0)
        localStorage.removeItem("email")
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        localStorage.removeItem("idRole")
        localStorage.removeItem("idUser")
        localStorage.removeItem("role")
        localStorage.removeItem("idTicket")
      })
      // this.router.navigate(['admin']);
    } else {
      console.log("Seja bem-vindo! Entre ou Cadastre-se para utilizar.")
      localStorage.clear()
    }

  }

  //  DECLARACAO DAS VARIAVEIS ---- LOGIN
  // analista = new Usuario("analista@gmail.com", "@analista123", "analista")
  // usuario = new Usuario("usuario@gmail.com", "@usuario123", "usuario")
  // gerente = new Usuario("gerente@gmail.com", "@gerente123", "gerente")
  // users = [this.analista, this.usuario, this.gerente]

  email: string = "";
  password: string = "";

  emailOk: boolean = false;
  passwordOk: boolean = false;

  emailPreenchido: Boolean = false;
  senhaPreenchida: Boolean = false;

  loginsuccess: Boolean = false;

  _errorEmail: string = "";
  _errorPass: string = "";

  regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  constructor(private router: Router) { }

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<    LOGIN    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //

  validateEmail(email: string) {
    return this.regexEmail.test(email);
  };

  validarEmail() {
    if (this.email == "") {
      this.emailOk = false;
      this._errorEmail = "";
    } else if (!this.validateEmail(this.email)) {
      this.emailOk = false;
      this._errorEmail = "Email inválido"
    } else {
      this.emailOk = true;
      this._errorEmail = "";
    }
  }

  isPassword() {
    if (this.password == "") {
      this.passwordOk = false;
      this._errorPass = "";
    } else if (this.password.length > 0 && this.password.length < 8) {
      this.passwordOk = false;
      this._errorPass = "A senha deve ter no mínimo 8 caracteres.";
    } else {
      this.passwordOk = true;
      this._errorPass = "";
    }
  }

  login() {

    if (this.email.length <= 0) {
      this.emailOk = false;
      this._errorEmail = "Campo Obrigatório!";
    } else {
      this.emailPreenchido = true;
      this._errorEmail = "";
    }
    if (this.password.length <= 0) {
      this.passwordOk = false;
      this._errorPass = "Campo Obrigatório!";
    } else {
      this.senhaPreenchida = true;
      this._errorPass = "";
    }
    if (this.emailPreenchido && this.senhaPreenchida) {
      this.validarEmail();
      this.isPassword();
      if (this.emailOk && this.passwordOk) {
        this._errorEmail = "";
        this._errorPass = "";

        var json = { email: this.email, password: this.password }

        api.post("login", json)
        .then((response) => {
          this.roles.forEach(element => {
            if (element.id == response.data.idRole) {
              localStorage.setItem("role", element.role)
            }
          });
          localStorage.setItem("token", response.data.token)
          localStorage.setItem("email", response.data.email)
          localStorage.setItem("name", response.data.name)
          localStorage.setItem("idRole", response.data.idRole)
          localStorage.setItem("idUser", response.data.idUser)
          window.location.assign('/my-profile')
        }).catch((error) => {
          console.log(error)
          this.router.navigate(['login-incorreto']);
        })
      }
    }
  }
}
