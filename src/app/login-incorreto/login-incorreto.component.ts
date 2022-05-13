import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-incorreto',
  templateUrl: './login-incorreto.component.html',
  styleUrls: ['./login-incorreto.component.css']
})
export class LoginIncorretoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  voltar(){
    this.router.navigate(['login']);
  }

}
