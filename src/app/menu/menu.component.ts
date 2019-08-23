import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private loginService:AuthenticationService) { }
  username: string;
  ngOnInit() {
    this.username = sessionStorage.getItem('username');
  }


}
