import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserResponse} from '../dtos/user-response';
import {UserRegistrationRequest} from '../dtos/user-registration-request';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = "http://localhost:8080/users";
  constructor(private http: HttpClient) {}

  public registrar(user: UserRegistrationRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.url}`, user);
  }
  public emailExiste(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/validate-email?email=${email}`);
  }
}
