// edit-post-modal.component.ts
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from 'src/app/services/posts/post.service';

@Component({
  selector: 'app-edit-post-modal',
  templateUrl: './edit-post-modal.component.html',
  styleUrls: ['./edit-post-modal.component.scss'],
})
export class EditPostModalComponent {
  @Input() post: any;

  editedTitle: string = '';
  editedContent: string = '';

  constructor(public activeModal: NgbActiveModal, private postService: PostService) { }

  ngOnInit() {
    // Inicializar los campos del formulario con los datos actuales del post    
    this.editedTitle = this.post.title;
    this.editedContent = this.post.content;
  }

  saveChanges() {
    const editedPostData = {
      title: this.editedTitle,
      content: this.editedContent,
    };

    this.postService.editPost(this.post._id, editedPostData).subscribe(
      (response: any) => {
        console.log('Post editado exitosamente:', response);
        this.activeModal.close('Cambios guardados');
      },
      (error: any) => {
        console.error('Error al editar el post:', error);
        // Maneja el error según tus necesidades
      }
    );
  }
}
