import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { MustMatch } from 'src/app/utils/validators';
import { UserService } from './../../../services/user/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error: string;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.buildForm();
   }

  ngOnInit() {
  }

  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      // console.log(this.form.value);
      this.userService.register(this.form.value.username, this.form.value.password).subscribe(
        (data) => {
          this.error = '0';
        },
        (error) => {
          console.log(error.status);
          if (error.status === 403) {
            this.error = '1';
            // alert('Este usuario ya existe');
          } else {
            // alert('Usuario Creado con exito');
          }
        }
      );
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      otherpassword: ['', [Validators.required]]
    }, {
      validator: MustMatch('password', 'otherpassword')
    });
  }

  get usernameField() {
    return this.form.get('username');
  }

  get passwordField() {
    return this.form.get('password');
  }

  get otherpasswordField() {
    return this.form.get('otherpassword');
  }

}
