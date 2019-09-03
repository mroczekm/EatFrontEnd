import { Component, OnInit } from '@angular/core';
import {Order} from "../model/order";
import {User} from "../model/user";
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  displayedColumns: string[] = ['position', 'user', 'date', 'name', 'description', 'status', 'action' ];
  orders: Order[] = [];
  currentUser: User;

  constructor(private  api: ApiService) {
  }

  ngOnInit() {
    this.getUserByUsername();
    this.getAllOrder();
  }

  public getAllOrder() {
    this.api.getAllOrder().subscribe(res => {
        this.orders = res.filter(item => item.status == 'Zamknięte');
      },
      error => {
        alert('An error on getting all orders');
      });
  }

  getUserByUsername() {
    console.log(sessionStorage.getItem('username'));
    this.api.getUserByUsername(sessionStorage.getItem('username')).subscribe(res => {
      this.currentUser = res
    }, error => {
      alert('An error in getting user by username');
    });
    console.log('USER');
    console.log(this.currentUser);
    /* console.log('USER_ID');
     console.log(sessionStorage.getItem('userId'));*/
  }
}
