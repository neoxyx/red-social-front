// post.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = environment.urlBase;

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any[]> {
    const token = localStorage.getItem('token');

    // Verificar si el token está presente antes de agregarlo a los encabezados
    const headers = token
      ? new HttpHeaders({ 'x-auth-token': token })
      : new HttpHeaders();

    return this.http.get<any[]>(`${this.apiUrl}/api/posts`, { headers });
  }

  createPost(content: string): Observable<any> {
    const token = localStorage.getItem('token');
    // Verificar si el token está presente antes de agregarlo a los encabezados
    const headers = token
      ? new HttpHeaders({ 'x-auth-token': token })
      : new HttpHeaders();

    const postData = { content };

    return this.http.post(`${this.apiUrl}/api/posts`, postData, { headers });
  }

  editPost(postId: string, postData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/${postId}/edit/`, postData);
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/posts/${postId}`);
  }
}
