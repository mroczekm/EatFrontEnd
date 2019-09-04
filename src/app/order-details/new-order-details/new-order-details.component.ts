import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order} from "../../model/order";
import {HttpClient} from "@angular/common/http";
import {OrderDetails} from "../../model/order-deatils";
import {ApiService} from "../../service/api.service";
import {MatSnackBar} from "@angular/material";

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
  @Output()
  uploaded = new EventEmitter<string>();

  orderDetails: OrderDetails;
  model: newOrderDetails = {
    dish: '',
    price: null,
    description: '',
    extra: null
  }

  constructor(private api: ApiService,
              private snackBar: MatSnackBar,) {
  }

  ngOnInit() {

  }

  addToOrder() {

    this.orderDetails = new OrderDetails(Number(sessionStorage.getItem('userId')), this.id, this.model.dish, this.model.price, this.model.description, this.model.extra, 'NOT_PAID');
    console.log(this.orderDetails);
    this.api.addToOrder(this.orderDetails).subscribe(res => {
        this.model.extra = null;
        this.model.price = null;
        this.model.dish = '';
        this.model.description = '';
        this.uploaded.emit();
        this.snackBar.open("Dodawno do zamówienia", "" , {duration: 4000});
      },
      error => {
        alert('An error in adding new order');
      });
  }
}
