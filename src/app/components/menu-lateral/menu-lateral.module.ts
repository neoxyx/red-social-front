import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MenuLateralComponent } from './menu-lateral.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    MenuLateralComponent,
    EditarUsuarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbCollapseModule,
    MaterialModule
  ],
  exports: [MenuLateralComponent],
  providers: [
    // ...
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ]
})
export class MenuLateralModule { }
