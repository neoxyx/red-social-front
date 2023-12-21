// post.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = environment.urlBase;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPosts(): Observable<any[]> {
    const token = this.authService.getToken();

    // Verificar si el token está presente antes de agregarlo a los encabezados
    const headers = token
      ? new HttpHeaders({ 'x-auth-token': token })
      : new HttpHeaders();

    return this.http.get<any[]>(`${this.apiUrl}/api/posts`, { headers });
  }

  createPost(postData: any): Observable<any> {
    const token = this.authService.getToken();
    // Verificar si el token está presente antes de agregarlo a los encabezados
    const headers = token
      ? new HttpHeaders({ 'x-auth-token': token })
      : new HttpHeaders();

    return this.http.post(`${this.apiUrl}/api/posts`, postData, { headers });
  }

  editPost(postId: string, postData: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = token
      ? new HttpHeaders({ 'x-auth-token': token })
      : new HttpHeaders();
    return this.http.put(`${this.apiUrl}/api/posts/${postId}`, postData, { headers });
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/posts/${postId}`);
  }
}
