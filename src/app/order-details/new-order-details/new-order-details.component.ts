import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../model/order";
import {HttpClient} from "@angular/common/http";
import {OrderDetails} from "../../model/order-deatils";
import {ApiService} from "../../service/api.service";

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

  constructor(private api: ApiService) {
  }

  ngOnInit() {

  }

  addToOrder() {
    //TODO user ID
    this.orderDetails = new OrderDetails(1, this.id, this.model.dish, this.model.price, this.model.description, this.model.extra, 'NOT_PAID');
    this.api.addToOrder(this.orderDetails).subscribe(res => {
      },
      error => {
        alert('An error in adding new order');
      });
  }
}
