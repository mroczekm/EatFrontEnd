import {Component, OnInit} from '@angular/core';
import {OrderDetails} from "../model/order-deatils";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orderDetails: OrderDetails[] = [];
  toPay = 0;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getOrdersByUserId(1);

  }

  private getOrdersByUserId(id: number) {
    const url = 'http://localhost:8082/orderDetails/getByUserId/' + id;
    this.http.get<OrderDetails[]>(url).subscribe(res => {
      this.orderDetails = res;
      this.calculateToPay();
    }, error => alert('An error on geting all orders by user'))

  }

  private calculateToPay() {
    this.orderDetails.forEach(f => f.status == 'NOT_PAID' ? this.toPay += f.price + f.extra : '')
  }
}
