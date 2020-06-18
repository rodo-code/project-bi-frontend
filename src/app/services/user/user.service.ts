import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { LoginCredentials } from './../../models/login.model';
import { RegisterCredentials } from 'src/app/models/register.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private cookies: CookieService,
    private http: HttpClient
  ) { }

  login(usernameForm: string, passwordForm: string) {

    const loginData = {
      username: usernameForm,
      password: passwordForm
    };
    return this.http.post<LoginCredentials>(`${environment.url_api}/login`, loginData);
  }

  register(usernameForm: string, passwordForm: string) {
    const loginData = {
      username: usernameForm,
      password: passwordForm
    };
    return this.http.post(`${environment.url_api}/register-user`, loginData);
  }


  setToken(token: string) {
    // this.cookies.delete('token');
    this.cookies.set('token', token);
  }

  getToken() {
    return this.cookies.get('token');
  }

  setRol(rol: string) {
    this.cookies.set('rol', rol);
  }
  getRol() {
    return this.cookies.get('rol');
  }
  logout() {
    this.cookies.delete('token');
    this.cookies.delete('rol');
  }
}
