import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../model/order";
import {HttpClient} from "@angular/common/http";
import {OrderDetails} from "../../model/order-deatils";

export interface newOrderDetails {
  dish: string;
  price: number;
  description: string;
  extra: number;
}

@Component({
  selector: 'app-new-order-details',
  templateUrl: './new-order-details.component.html',
  styleUrls: ['./new-order-details.component.css']
})
export class NewOrderDetailsComponent implements OnInit {
  @Input() id: number
  orderDetails: OrderDetails;
  model: newOrderDetails = {
    dish: '',
    price: 0.00,
    description: '',
    extra: 0.00
  }

  constructor(private http:HttpClient) { }

  ngOnInit() {

  }

  addToOrder() {
    const url = 'http://localhost:8082/orderDetails';
    this.orderDetails = new OrderDetails(1, this.id,this.model.dish, this.model.price,this.model.description,this.model.extra, 'NOT_PAID');
    this.http.post(url, this.orderDetails).subscribe(res => {
        /!*this.orders = res*!/
      },
      error => {
        alert('An error in adding new order');
      });
  }
}
