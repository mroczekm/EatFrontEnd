import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Order} from '../model/order';
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];

  constructor(private  api: ApiService) {
  }

  ngOnInit() {
    this.getAllOrder();
  }

  public getAllOrder() {
    this.api.getAllOrder().subscribe(res => {
        this.orders = res;
      },
      error => {
        alert('An error on getting all orders');
      });
  }

  public deleteOrder(id: number): void {
    this.api.deleteOrder(id).subscribe(res => {
      },
      error => {
        alert('An error in deleting order');
      });
  }
}
