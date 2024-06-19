/*import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

}*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nome: string = "";
  email: string = "";
  cpf: string = "";
  telefone: string = "";
  senha: string = "";
  confirmesenha: string = "";


  constructor(private authService: AuthService, private alertService: AlertService, private router: Router) {}

  onSubmit() {

    if(this.senha == this.confirmesenha){
      this.authService.register(this.cpf, this.email, this.senha, this.nome,  this.telefone).subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Registration error', error);
          this.alertService.error("Erro no registro do usuário !");
        }
      );

    }
    else{
      this.alertService.error("As senhas não conferem !");
    }


  }

  voltarLogin(): void {
    this.router.navigate(['/login']);
  }


}
