import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  email: string = "";
  emailOk: boolean = false;
  emailPreenchido: Boolean = false;
  _errorEmail: string = "";
  regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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

  forgotPass() {
    if (this.email.length <= 0) {
      this.emailOk = false;
      this._errorEmail = "Campo Obrigatório!";
    } else {
      this.emailPreenchido = true;
      this._errorEmail = "";
    }

    if (this.emailPreenchido) {
      this.validarEmail();
      if (this.emailOk) {
        this._errorEmail = "";

        let json = { email: this.email}
        alert("VERIFIQUE O EMAIL "+json.email.valueOf()+" E RELEMBRE A SUA SENHA! ")
      }
    }
    this.email = ""
  }
}
