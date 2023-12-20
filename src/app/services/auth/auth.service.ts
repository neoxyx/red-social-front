// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/app/environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.urlBase;

  constructor(private http: HttpClient, private router: Router) { }

  isLoggedIn(): boolean {
    // Implementa la lógica para verificar si el usuario está autenticado
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si el token está presente, de lo contrario, false
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, { username, email, password });
  }

  login(credentials: { username: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
        })
      );
  }

  cerrarSesion() {
    // Elimina cualquier información de sesión (token, usuario actual, etc.)
    this.eliminarInformacionSesion();

    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['']);
  }

  private eliminarInformacionSesion() {
    localStorage.removeItem('token');
  }

  editarInformacion() {
    // Implementa la lógica para editar la información del usuario
    // Puedes redirigir al usuario a la página de edición de perfil o abrir un modal, por ejemplo.
    // E.g., this.router.navigate(['/editar-perfil']);
  }
}
