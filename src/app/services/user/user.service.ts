import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private cookies: CookieService,
  ) { }

  setToken(token: string) {
    this.cookies.set('rol', token);
  }

  getToken() {
    return this.cookies.get('rol');
  }

  logout() {
    this.cookies.delete('rol');
  }
}
