import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostListComponent } from './post-list/post-list.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPostModalComponent } from './edit-post-modal/edit-post-modal.component';
import { PostsRoutingModule } from './posts-routing.module';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MenuLateralModule } from '../menu-lateral/menu-lateral.module';

@NgModule({
  declarations: [
    PostsComponent,
    PostListComponent,
    CreatePostComponent,
    EditPostModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PostsRoutingModule,
    MenuLateralModule
  ],
  providers: [
    // ...
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ]
})
export class PostsModule { }
