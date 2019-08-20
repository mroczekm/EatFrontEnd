import {Component, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from '../../model/order';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  order: Order;
  model: NewOrder = {
    name: '',
    description: ''
  };

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  sendNewOrder(): void {
    const url = 'http://localhost:8082/orders';
    this.order = new Order(new Date(), this.model.name, this.model.description, 'OPEN');
    this.http.post(url, this.order).subscribe(res => {
      },
      error => {
        alert('An error in adding new order');
      });
  }
}

export interface NewOrder {
  name: string;
  description: string;
}
