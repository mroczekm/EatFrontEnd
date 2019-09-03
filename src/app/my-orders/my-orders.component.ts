import {Component, OnInit} from '@angular/core';
import {OrderDetails} from "../model/order-deatils";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orderDetails: OrderDetails[] = [];
  toPay = 0;
  displayedColumns: string[] = ['position', 'user', 'dish', 'description', 'price', 'extra', 'total', 'status', 'action' ];


  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.getOrdersByUserId(1);

  }

  private getOrdersByUserId(id: number) {
    this.api.getOrdersByUserId(id).subscribe(res => {
      this.orderDetails = res;
      this.calculateToPay();
    }, error => alert('An error on getting all orders by user'))

  }

  private calculateToPay() {
    this.orderDetails.forEach(f => f.status == 'NOT_PAID' ? this.toPay += f.price + f.extra : '')
  }
}
