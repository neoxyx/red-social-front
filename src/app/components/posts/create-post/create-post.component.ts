// create-post.component.ts
import { Component } from '@angular/core';
import { PostService } from 'src/app/services/posts/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  content: string = '';

  constructor(private postService: PostService, private router: Router) { }

  createPost() {
    this.postService.createPost(this.content).subscribe(
      () => {
        console.log('post creado');
        // Éxito al crear el post, redirige al usuario a la vista de posts
        this.router.navigate(['/posts/list-posts']);
      },
      error => {
        console.error('Error al crear el post', error);
        // Manejar errores según sea necesario
      }
    );
  }

  volver() {
    this.router.navigate(['/posts/list-posts']);
  }
}
