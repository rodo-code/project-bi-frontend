import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user/user.service';
import { LoginCredentials } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  credentials: LoginCredentials;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  login(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      // console.log(this.form.value);
      // this.userService.logout();
      const logindata = this.form.value;
      this.fetchCredentials(logindata).then(
        credentials => {
          if (this.credentials.message === 'Authentication OK') {
            if (logindata.username === 'Admin' && logindata.password === 'Admin123') {
              console.log('Admin');
              this.userService.setRol('2');
              this.userService.setToken(this.credentials.authentication);
              this.router.navigate(['./admin']);
            } else {
              console.log('User');
              this.userService.setRol('1');
              this.userService.setToken(this.credentials.authentication);
              this.router.navigate(['./dashboard']);
            }
          } else {
            alert('Usuario o Pasword Incorrecto');
          }
        }
      );
    }
  }

  fetchCredentials(logindata): Promise<void | LoginCredentials> {
    return this.userService.login(logindata.username, logindata.password).toPromise().then(res => this.credentials = res)
    .catch(msg => console.log(msg));
  }


  private buildForm() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get usernameField() {
    return this.form.get('username');
  }

  get passwordField() {
    return this.form.get('password');
  }

}
