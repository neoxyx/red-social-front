import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/app/environment/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl = environment.urlBase; // Reemplaza con tu URL de backend

    constructor(private http: HttpClient, private authService: AuthService) { }

    editUser(updatedUserData: any): Observable<any> {
        const token = this.authService.getToken();

        // Verificar si el token está presente antes de agregarlo a los encabezados
        const headers = token
            ? new HttpHeaders({ 'x-auth-token': token })
            : new HttpHeaders();

        return this.http.put(`${this.apiUrl}/api/user`, updatedUserData, { headers });
    }
}
