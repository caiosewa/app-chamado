import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import api from 'src/services/api';
import { Register } from '../model/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  //  DECLARACAO DAS VARIAVEIS ----  REGISTER
  userRegister = new Register("", "", "", "")

  filtro: any = /^([a-zA-zà-úÀ-Ú]|\s+)+$/;
  num: any = /^[0-9]+$/;
  pass: any = /^(?=.*[!$*&@#])[0-9a-zA-Z!$*&@#]+$/;
  regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  nameregister: string = "";
  emailregister: string = "";
  passwordregister: string = "";
  passwordconfirm: string = "";
  typeSelected: string = "";

  nameRegisterOk: boolean = false;
  emailRegisterOk: boolean = false;
  passwordRegisterOk: boolean = false;
  passwordRegisterFraco: boolean = false;
  passwordConfirmOk: boolean = false;

  nameRegisterPreenchido: boolean = false;
  emailRegisterPreenchido: boolean = false;
  passwordRegisterPreenchido: boolean = false;
  passwordConfirmPreenchido: boolean = false;
  typePreenchido: boolean = false;

  _errorNameRegister: string = "";
  _errorEmailRegister: string = "";
  _errorPasswordRegister: string = "";
  _errorPasswordFraco: string = "";
  _errorPasswordConfirm: string = "";
  _errorType: string = "";


  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<    REGISTER    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
  validateEmail(email: string) {
    return this.regexEmail.test(email);
  };

  validarNameRegister() {
    if (this.nameregister == "") {
      this.nameRegisterOk = false;
      this._errorNameRegister = "";
    }else if (!this.filtro.test(this.nameregister)) {
      this._errorNameRegister = "Preencha o campo Nome corretamente!";
      this.nameRegisterOk = false;
    }else {
      this.nameRegisterOk = true;
      this._errorNameRegister = "";
    }
  }

  validarEmailRegister() {
    if (this.emailregister == "") {
      this.emailRegisterOk = false;
      this._errorEmailRegister = "";
    } else if (!this.validateEmail(this.emailregister)) {
      this.emailRegisterOk = false;
      this._errorEmailRegister = "Digite um Email válido!"
    } else {
      this.emailRegisterOk = true;
      this._errorEmailRegister = "";
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

  getType(event: any) {
    this.typeSelected = event.target.value;
    this._errorType = "";
  }

  register() {
    if (this.nameregister.length <= 0){
      this.nameRegisterPreenchido = false;
      this._errorNameRegister = "Campo Obrigatório!";
    }else{
      this.nameRegisterPreenchido = true;
      this._errorNameRegister = "";
    }

    if (this.emailregister.length <= 0){
      this.emailRegisterPreenchido = false;
      this._errorEmailRegister = "Campo Obrigatório!";
    }else{
      this.emailRegisterPreenchido = true;
      this._errorEmailRegister = "";
    }

    if (this.passwordregister.length <= 0){
      this.passwordRegisterPreenchido = false;
      this._errorPasswordRegister = "Campo Obrigatório!";
    }else{
      this.passwordRegisterPreenchido = true;
      this._errorPasswordRegister = "";
    }

    if (this.passwordconfirm.length <= 0){
      this.passwordConfirmPreenchido = false;
      this._errorPasswordConfirm = "Campo Obrigatório!";
    }else{
      this.passwordConfirmPreenchido = true;
      this._errorPasswordConfirm = "";
      this.validarPasswordConfirm()
    }

    if (this.typeSelected.length <= 0){
      this.typePreenchido = false;
      this._errorType = "Selecione uma opção!"
    }else{
      this.typePreenchido = true;
      this._errorType = ""
    }

    if(this.nameRegisterPreenchido && this.emailRegisterPreenchido && this.passwordRegisterPreenchido && this.passwordConfirmPreenchido && this.typePreenchido) {
      this.validarNameRegister()
      this.validarEmailRegister()
      this.isPasswordRegister()
      this.validarPasswordConfirm()
      if(this.nameRegisterOk && this.emailRegisterOk && this.passwordRegisterOk && this.passwordConfirmOk && this.typePreenchido){
        this.userRegister.nameregister = this.nameregister
        this.userRegister.emailregister = this.emailregister
        this.userRegister.passwordregister = this.passwordregister
        this.userRegister.typeSelected = this.typeSelected

        let jsonReg = { email: this.userRegister.emailregister, password: this.userRegister.passwordregister, name: this.userRegister.nameregister, idRole: Number(this.userRegister.typeSelected)}
        api.post("User", jsonReg)
        .then(response => {
          alert("Foi registrado usuario - ID: "+ response.data.idUser + ", Nome: " + response.data.name + ", Email: " + response.data.email)
          this.router.navigate(['login'])
        }).catch(error => {
          alert("Error ao registrar usuário - "+ error)
          window.location.reload()
        });
      }
    }
  }

}
