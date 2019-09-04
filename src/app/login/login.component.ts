import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from "../service/authentication.service";
import {MatSnackBar} from "@angular/material";
import {ApiService} from "../service/api.service";
import {User} from "../model/user";
import {Form, FormGroup, NgForm} from "@angular/forms";
import {config} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;

  hide = true;

  username = '';
  password = '';
  firstName = '';
  lastName = '';
  invalidLogin = false
  user: User;
  scdPassword: '';

  constructor(private router: Router,
              private loginService: AuthenticationService,
              private snackBar: MatSnackBar,
              private api: ApiService
  ) {
  }

  ngOnInit() {
  }

  initForm(){


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
    this.user = new User(this.firstName, this.lastName, this.username, this.password);
    this.api.singInUser(this.user).subscribe(res => {
      this.username = '';
      this.password = '';
      this.firstName = '';
      this.lastName = '';
      this.snackBar.open("Użytkownik został utworzony", "", {duration: 4000});
    })
  }
}
