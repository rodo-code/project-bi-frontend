import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { CaseRegister } from './../../models/case-register.model';
import { UserService } from './../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  constructor(
    private userService: UserService,
    private http: HttpClient
  ) { }

  registerCase(caser: CaseRegister) {
    console.log('Token');
    console.log(this.userService.getToken());
    const headersd = new HttpHeaders({
      // 'Content-Type': 'application/json',
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Token ' + this.userService.getToken()
    });
    const options = { headers: headersd };
    return this.http.post<CaseRegister>(`${environment.url_api}/register-case`, caser, options);
  }
}
