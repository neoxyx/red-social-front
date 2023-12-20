import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerUsername = '';
  registerEmail = '';
  registerPassword = '';
  registrationMessage: string = '';
  registrationSuccess: boolean = false;

  constructor(private authService: AuthService) { }

  register() {
    this.authService.register(this.registerUsername, this.registerEmail, this.registerPassword).subscribe(
      () => {
        this.registrationSuccess = true;
        this.registrationMessage = 'Usuario registrado con éxito';
      },
      (error) => {
        this.registrationSuccess = false;
        this.registrationMessage = 'Error al registrar usuario: ' + error.message;
      }
    );
  }
}