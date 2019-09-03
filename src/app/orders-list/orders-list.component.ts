import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {Order} from '../model/order';
import {ApiService} from "../service/api.service";
import {User} from "../model/user";
import {MatSnackBar, MatSort} from "@angular/material";


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'user', 'date', 'name', 'description', 'status', 'action'];
  orders: Order[] = [];
  currentUser: User;

  constructor(private  api: ApiService,
              private snackBar: MatSnackBar) {
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;


  ngOnInit() {
    this.getUserByUsername();
    this.getAllOrder();
  }


  public getAllOrder() {
    this.api.getAllOrder().subscribe(res => {
        this.orders = res.filter(item => item.status != 'Zamknięte');
      },
      error => {
        alert('An error on getting all orders');
      });

  }

  public deleteOrder(id: number): void {
    this.api.deleteOrder(id).subscribe(res => {
        this.getAllOrder();
        this.snackBar.open("Zamówienie zostało usunięte", "OK" , {duration: 4000});

      },
      error => {
        alert('An error in deleting order');
      });

  }

  getUserByUsername() {
    console.log(sessionStorage.getItem('username'));
    this.api.getUserByUsername(sessionStorage.getItem('username')).subscribe(res => {
      this.currentUser = res;
    }, error => {
      alert('An error in getting user by username');
    });
  }
}
