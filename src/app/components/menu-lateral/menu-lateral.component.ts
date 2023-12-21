// menu-lateral.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { JwtHelperService } from '@auth0/angular-jwt'; // Asegúrate de tener instalada esta librería
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/post';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
})
export class MenuLateralComponent implements OnInit {
  user: any; // Variable para almacenar la información del usuario
  isCollapsed = false;

  constructor(private authService: AuthService, private modalService: NgbModal, public dialog: MatDialog, private jwtHelper: JwtHelperService, private router: Router) { }

  ngOnInit() {
    // Obtener información del usuario al iniciar el componente
    this.user = this.authService.getUserInfo();
  }

  openEditUserModal() {
    console.log(this.user);
    // Verifica si el post pertenece al usuario actual antes de abrir el modal
    const modalRef = this.modalService.open(EditarUsuarioComponent, { size: 'lg' });

    // Pasa los datos del post seleccionado al modal
    modalRef.componentInstance.user = { ...this.user };

    modalRef.result.then(
      (result) => {
        console.log('Modal cerrado con éxito', result);
        this.user = this.authService.getUserInfo();
      },
      (reason) => {
        console.log('Modal cerrado con descarte', reason);
      }
    );
  }

  editarInformacion() {
    this.router.navigate(['/usuario/editar']);
    // Llamar al método de editar información en el servicio de autenticación
    //this.authService.editarInformacion();
  }

  cerrarSesion() {
    // Implementar lógica para cerrar sesión (puedes hacerlo en el servicio de autenticación)
    this.authService.cerrarSesion();
  }
}
