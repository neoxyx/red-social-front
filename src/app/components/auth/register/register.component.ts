import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registrationForm: FormGroup;
  registrationMessage: string = '';
  registrationSuccess: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register() {
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;
      this.authService.register(userData).subscribe(
        (response) => {
          // Manejar la respuesta exitosa, redirección, etc.
          console.log('Usuario registrado exitosamente', response);
          this.registrationSuccess = true;
          this.registrationMessage = 'Usuario registrado con éxito';
        },
        (error) => {
          // Manejar errores, por ejemplo, mostrar un mensaje al usuario
          this.registrationSuccess = false;
          this.registrationMessage = 'Error al registrar usuario: ' + error.message;
          console.error('Error al registrar el usuario', error);
        }
      );
    }
  }
}