import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../model/order";

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];

  constructor(private  http: HttpClient) { }

  ngOnInit() {
    this.getAllOrder();
  }

  public getAllOrder(){
    let url = "http://localhost:8082/orders/all"
    this.http.get<Order[]>(url).subscribe(res => {this.orders = res},
      error => {alert("An error on getting all orders")})
  }

}
