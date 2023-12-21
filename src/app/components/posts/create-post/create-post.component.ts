// create-post.component.ts
import { Component } from '@angular/core';
import { PostService } from 'src/app/services/posts/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  postForm: FormGroup;



  constructor(private fb: FormBuilder, private postService: PostService, private router: Router) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
  }

  createPost() {
    if (this.postForm.valid) {
      const postData = this.postForm.value;
      this.postService.createPost(postData).subscribe(
        (response) => {
          // Manejar la respuesta exitosa, redirección, etc.
          console.log('Post creado exitosamente', response);
          this.router.navigate(['/posts/list-posts']);
        },
        (error) => {
          // Manejar errores, por ejemplo, mostrar un mensaje al usuario
          console.error('Error al crear el post', error);
        }
      );
    }
  }

  volver() {
    this.router.navigate(['/posts/list-posts']);
  }
}
