import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from "../service/authentication.service";
import {ErrorStateMatcher, MatSnackBar} from "@angular/material";
import {ApiService} from "../service/api.service";
import {User} from "../model/user";
import {Form, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  hide = true;

  username = '';
  password = '';
  invalidLogin = false
  user: User;

  constructor(private router: Router,
              private loginService: AuthenticationService,
              private snackBar: MatSnackBar,
              private api: ApiService,
              private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      verifyPassword: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    }, {
      validator: this.passwordValidator,
    })
  }

  checkLogin() {
    if (this.loginService.authenticate(this.username, this.password)) {
      this.invalidLogin = true
    } else {
      this.invalidLogin = false
      this.username = '';
      this.password = '';
    }
  }

  singIn() {
    this.user = new User(this.userForm.get('firstName').value,this.userForm.get('lastName').value,this.userForm.get('username').value,this.userForm.get('password').value);
    this.api.singInUser(this.user).subscribe(res => {
      this.userForm.reset();
      this.snackBar.open("Użytkownik został utworzony", "", {duration: 4000});
    })
  }

  passwordValidator(form: FormGroup) {
    const condition = form.get('password').value !== form.get('verifyPassword').value;
    return condition ? {passwordsDoNotMatch: true} : null;

  }

  onKeydown(event) {
    if (event.key === "Enter") {
      this.checkLogin()
    }
  }
}
