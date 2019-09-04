import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../model/user";
import {delay, map} from "rxjs/operators";
import {Observable, Subscription} from "rxjs";
import {ApiService} from "./api.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public authentication: boolean = false;


  constructor(private httpClient: HttpClient,
              private api: ApiService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  async authenticate(username, password) {
        this.authentication = await this.api.validate(username,password).toPromise()
      .catch(reason => {
        return false
      });
    if (this.authentication) {
      sessionStorage.setItem('username', username)
      let authString = 'Basic ' + btoa(username + ':' + password);
      sessionStorage.setItem('basicauth', authString);
      this.router.navigate([''])
    } else {
      this.snackBar.open("Podano błędny mail lub hasło", "", {duration: 5000});
    }

    return this.authentication;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log(this.authentication));
  }
}
