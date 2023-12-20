import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  loginMessage: string = '';
  loginSuccess: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.credentials).subscribe(
      () => {
        this.loginSuccess = true;
        this.loginMessage = 'Inicio de sesión exitoso.';
        this.router.navigate(['/posts/list-posts']);
      },
      (error) => {
        this.loginSuccess = false;
        this.loginMessage = 'Error al iniciar sesión: ' + error.message;
      }
    );
  }
}