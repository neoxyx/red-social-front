// menu-lateral.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt'; // Asegúrate de tener instalada esta librería

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
})
export class MenuLateralComponent implements OnInit {
  usuario: any; // Variable para almacenar la información del usuario

  constructor(private authService: AuthService, private jwtHelper: JwtHelperService) { }

  ngOnInit() {
    // Obtener información del usuario al iniciar el componente
    this.obtenerInformacionUsuario();
  }

  obtenerUsuarioDesdeToken(): string | null {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = this.jwtHelper.decodeToken(token);
        console.log(decodedToken);
        return decodedToken.user.username;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }

    return null;
  }


  obtenerInformacionUsuario() {
    // Obtener la información del usuario desde el servicio de autenticación
    this.usuario = this.obtenerUsuarioDesdeToken();
  }

  editarInformacion() {
    // Llamar al método de editar información en el servicio de autenticación
    this.authService.editarInformacion();
  }

  cerrarSesion() {
    // Implementar lógica para cerrar sesión (puedes hacerlo en el servicio de autenticación)
    this.authService.cerrarSesion();
  }
}
