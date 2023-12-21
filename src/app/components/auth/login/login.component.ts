import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  credentials = { username: '', password: '' };
  loginMessage: string = '';
  loginSuccess: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.login(loginData).subscribe(
        (response) => {
          // Manejar la respuesta exitosa, redirección, etc.
          console.log('Usuario autenticado correctamente', response);
          this.loginSuccess = true;
          this.loginMessage = 'Inicio de sesión exitoso.';
          this.router.navigate(['/posts/list-posts']);
        },
        (error) => {
          // Manejar errores, por ejemplo, mostrar un mensaje al usuario
          this.loginSuccess = false;
          this.loginMessage = 'Error al iniciar sesión: ' + error.message;
        }
      );
    }
  }
}