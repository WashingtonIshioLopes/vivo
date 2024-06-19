/*import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

}*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: string = "";
  senha: string = "";

  constructor(private authService: AuthService, private alertService: AlertService, private router: Router) {}

  onSubmit() {

    let tipoLogin = this.validateEmailOrCPF(this.login);

    if(tipoLogin == "cpf"){
      this.authService.login(this.login, this.senha).subscribe(
        data => {
          localStorage.setItem('token', data.token);
          //this.router.navigate(['/movies']);
          let tipo = 'todos';
          this.router.navigate(['/movies']);
        },
        error => {
          this.alertService.error("Erro de LOGIN !");
          console.error('Login error', error);
        }
      );
    }
    else{
      this.authService.login2(this.login, this.senha).subscribe(
        data => {
          localStorage.setItem('token', data.token);
          //this.router.navigate(['/movies']);
          let tipo = 'todos';
          this.router.navigate(['/movies']);
        },
        error => {
          this.alertService.error("Erro de LOGIN !");
          console.error('Login error', error);
        }
      );
    }


  }

  registerUser() {
    this.router.navigate(['/register']);
  }

  validateEmailOrCPF(value: string): string {
    if (this.isEmail(value)) {
      return 'email';
    } else if (this.isCPF(value)) {
      return 'cpf';
    } else {
      return 'invalid';
    }
  }

  isEmail(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  isCPF(value: string): boolean {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    return cpfRegex.test(value);
  }  

}
