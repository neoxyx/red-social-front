import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { UsuarioComponent } from './usuario.component';

@NgModule({
  declarations: [UsuarioComponent, EditarUsuarioComponent],
  imports: [
    CommonModule
  ]
})
export class UsuarioModule { }
