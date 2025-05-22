import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LoginRequest } from '../dtos/login-request';
import { TokenResponse } from '../dtos/token-response';
import { ErrorResponse } from '../dtos/error-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = 'http://localhost:8080/login';

  constructor(private http: HttpClient) {}

  /**
   * Envía las credenciales al backend para autenticación.
   * @param email Correo del usuario
   * @param password Contraseña del usuario
   */
  login(email: string, password: string): Observable<TokenResponse> {
    const request: LoginRequest = { email, password };

    return this.http.post<TokenResponse>(this.url, request).pipe(
      tap(response => {
        this.guardarToken(response);
      }),
      catchError(error => {
        let errorMsg = 'Error al iniciar sesión';
        if (error.status === 400 || error.status === 401) {
          const errorResponse: ErrorResponse = error.error;
          errorMsg = errorResponse.message || 'Credenciales inválidas';
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  /**
   * Guarda el token y datos de sesión en localStorage.
   */
  private guardarToken(response: TokenResponse): void {
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('tokenType', response.type);
    localStorage.setItem('expireAt', response.expireAt);
    localStorage.setItem('roles', JSON.stringify(response.roles));
    if (response.fullName) {
      localStorage.setItem('fullName', response.fullName);
    }
    if (response.role) {
      localStorage.setItem('role', response.role);
    }
  }

  /**
   * Verifica si el usuario está autenticado.
   */
  isAuthenticated(): boolean {
    const expireAt = localStorage.getItem('expireAt');
    if (!expireAt) return false;

    const expireDate = new Date(expireAt);
    return !!localStorage.getItem('authToken') && expireDate > new Date();
  }

  /**
   * Cierra sesión y limpia almacenamiento.
   */
  logout(): void {
    localStorage.clear();
  }

  /**
   *
   */
  getRoles(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  /**
   *
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
