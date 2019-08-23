import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../model/user";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authentication = false;

  constructor(private httpClient: HttpClient) {
  }

  authenticate(username, password) {

    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ':' + password)});
    console.log(username);
    console.log(password);
    this.httpClient.get<boolean>('http://localhost:8082/users/validateLogin', {headers}).subscribe(
      s => this.authentication = s);
    if(this.authentication){
      sessionStorage.setItem('username', username)
      let authString = 'Basic ' + btoa(username + ':' + password);
      sessionStorage.setItem('basicauth', authString);
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
}
