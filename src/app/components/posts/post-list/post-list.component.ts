// post-list.component.ts
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/posts/post.service';
import { JwtHelperService } from '@auth0/angular-jwt'; // Asegúrate de tener instalada esta librería
import { Router } from '@angular/router';
import { EditPostModalComponent } from '../edit-post-modal/edit-post-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  selectedPost: any;
  terminoBusqueda: string = '';

  constructor(private postService: PostService, private jwtHelper: JwtHelperService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadPosts();
  }

  obtenerIdUsuarioDesdeToken(): string | null {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken.userId;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }

    return null;
  }

  loadPosts() {
    this.postService.getPosts().subscribe(
      (response) => {
        this.posts = response;
      },
      (error) => {
        console.error('Error al obtener la lista de posts:', error);
        // Maneja el error según tus necesidades
      }
    );
  }

  openOptions(post: any) {
    this.selectedPost = post;
  }

  openEditModal() {
    // Verifica si el post pertenece al usuario actual antes de abrir el modal
    if (this.isOwnPost(this.selectedPost)) {
      const modalRef = this.modalService.open(EditPostModalComponent, { size: 'lg' });

      // Pasa los datos del post seleccionado al modal
      modalRef.componentInstance.post = { ...this.selectedPost };

      modalRef.result.then(
        (result) => {
          console.log('Modal cerrado con éxito', result);
          this.loadPosts();
        },
        (reason) => {
          console.log('Modal cerrado con descarte', reason);
        }
      );
    } else {
      console.log('No tienes permisos para editar este post.');
      // Puedes mostrar un mensaje o realizar acciones según tus necesidades
    }
  }

  deletePost() {
    if (confirm('¿Estás seguro de que deseas eliminar este post?')) {
      this.postService.deletePost(this.selectedPost._id).subscribe(
        () => {
          console.log('Post eliminado exitosamente.');
          this.loadPosts(); // Actualiza la lista de posts después de eliminar
        },
        (error) => {
          console.error('Error al eliminar el post:', error);
          // Maneja el error según tus necesidades
        }
      );
    }
  }

  isOwnPost(post: any): boolean {
    // Obtén el ID del usuario actual desde el servicio de autenticación
    const currentUserId = this.obtenerIdUsuarioDesdeToken();

    // Verifica si el post pertenece al usuario actual
    return currentUserId !== null && post.userId === currentUserId;
  }

  filtrarPosts() {
    console.log(this.posts);
    if (!this.terminoBusqueda) {
      // Si el término de búsqueda está vacío, muestra todos los posts
      this.loadPosts();
    } else {
      // Filtra los posts basándose en el término de búsqueda
      this.posts = this.posts.filter((post) =>
        post.content.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        post.user.username.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      );
    }
  }

  goToCreate() {
    this.router.navigate(['/create-post']);
  }
}
