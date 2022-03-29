import { Component, OnInit } from '@angular/core';
import api from '../../services/api'
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { Register } from 'src/app/model/register';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  ngOnInit(): void {
    console.log("Seja bem-vindo! Entre ou Cadastre-se para utilizar.")
    console.log(this.users)
  }

  //  DECLARACAO DAS VARIAVEIS ---- LOGIN
  usuarioLogin = new Usuario("", "", "")
  analista = new Usuario("analista@gmail.com", "@analista123", "analista")
  usuario = new Usuario("usuario@gmail.com", "@usuario123", "usuario")
  gerente = new Usuario("gerente@gmail.com", "@gerente123", "gerente")
  users = [this.analista, this.usuario, this.gerente]

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

        this.usuarioLogin.email = this.email
        this.usuarioLogin.password = this.password

        var json = { login: this.usuarioLogin.email, password: this.usuarioLogin.password }
        for (var user of this.users) {
          if(json.login == user.email && json.password == user.password){
            this.email = ""
            this.password = ""
            this.loginsuccess = true
            alert("Logado com a conta de "+ user.typeuser)
          }
        }
        if(!this.loginsuccess){
          this.email = ""
          this.password = ""
          alert("Usuário ou senha inválidos")
        }
      }
    }

  }


    //   api.post("login", json)

    //   .then((response) => {
    //     this.router.navigate(['home']);
    //   }).catch((error) => {
    //     alert("Usuário ou senha incorreta!")
    //   })

}
