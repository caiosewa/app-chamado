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
  passwordregister: string = "";
  passwordconfirm: string = "";
  tokenreset: string = "";

  tokenOK: boolean = false;
  emailOk: boolean = false;
  passwordRegisterOk: boolean = false;
  passwordRegisterFraco: boolean = false;
  passwordConfirmOk: boolean = false;

  emailPreenchido: Boolean = false;
  passwordRegisterPreenchido: boolean = false;
  passwordConfirmPreenchido: boolean = false;

  tokenSolicitado: boolean = false;

  _errorEmail: string = "";
  _errorPasswordRegister: string = "";
  _errorPasswordFraco: string = "";
  _errorPasswordConfirm: string = "";
  _errorToken: string = "";

  num: any =  /^[0-9A-Z]+$/;
  regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  pass: any = /^(?=.*[$*&@#])[0-9a-zA-Z$*&@#]+$/;

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

  isPasswordRegister() {
    this.validarPasswordConfirm()
    if (this.passwordregister == "") {
      this.passwordRegisterFraco = false;
      this.passwordRegisterOk = false;
      this._errorPasswordRegister = "";
      this._errorPasswordFraco = "";
    } else if (this.passwordregister.length > 0 && this.passwordregister.length < 8) {
      this.passwordRegisterOk = false;
      this._errorPasswordRegister = "A senha deve ter no mínimo 8 caracteres.";
    } else if(!this.pass.test(this.passwordregister)) {
      this.passwordRegisterOk = true;
      this.passwordRegisterFraco = true;
      this._errorPasswordRegister = "";
      this._errorPasswordFraco = "A senha está fraca, insira no mínimo um caracter especial.";
    } else {
      this.passwordRegisterOk = true;
      this.passwordRegisterFraco = false;
      this._errorPasswordRegister = "";
      this._errorPasswordFraco = "";
    }
  }

  validarPasswordConfirm() {
    if (this.passwordconfirm == "") {
      this.passwordConfirmOk = false;
      this._errorPasswordConfirm = "";
    }else if (this.passwordregister != this.passwordconfirm) {
      this.passwordConfirmOk = false;
      this._errorPasswordConfirm = "A senha não confere!";
    }
    else {
      this.passwordConfirmOk = true;
      this._errorPasswordConfirm = "";
    }
  }

  validarToken(){
    if (this.tokenreset == "") {
      this.tokenOK = false;
      this._errorToken = "";
    }else if(this.num.test(this.tokenreset)){
      this.tokenOK = true;
      this._errorToken = "";
    }else{
      this.tokenOK = false
      this._errorToken = "FORMATO DE TOKEN INVÁLIDO";
    }
  }

  changePass() {

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

        this.tokenSolicitado = true;
      }
    }
  }
}
