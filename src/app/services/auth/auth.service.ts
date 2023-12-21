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
  private tokenKey = 'token'; // Clave para almacenar el token en el almacenamiento local

  constructor(private http: HttpClient, private router: Router) { }

  isLoggedIn(): boolean {
    // Verifica si el token está presente en el almacenamiento local
    return !!localStorage.getItem(this.tokenKey);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, userData);
  }

  login(loginData: any): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, loginData)
      .pipe(
        tap((response: any) => {
          if (response.token) {
            // Almacena el token en el almacenamiento local
            localStorage.setItem(this.tokenKey, response.token);
          }
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
    // Elimina el token del almacenamiento local al cerrar sesión
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    // Obtiene el token del almacenamiento local
    return localStorage.getItem(this.tokenKey);
  }

  editarInformacion() {
    // Implementa la lógica para editar la información del usuario
    // Puedes redirigir al usuario a la página de edición de perfil o abrir un modal, por ejemplo.
    // E.g., this.router.navigate(['/editar-perfil']);
  }
}
