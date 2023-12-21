import { Component, Inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/post';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent {
  @Input() user: any;

  editedUserName: string = '';
  editedEmail: string = '';

  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit() {
    // Inicializar los campos del formulario con los datos actuales del post    
    this.editedUserName = this.user.user.username;
    this.editedEmail = this.user.user.email;
  }

  saveChanges() {
    const editedUserData = {
      username: this.editedUserName,
      email: this.editedEmail,
    };

    this.userService.editUser(editedUserData).subscribe(
      (response: any) => {
        console.log('Usuario editado exitosamente:', response);
        this.activeModal.close('Cambios guardados');
      },
      (error: any) => {
        console.error('Error al editar el usuario:', error);
        // Maneja el error según tus necesidades
      }
    );
  }
}
