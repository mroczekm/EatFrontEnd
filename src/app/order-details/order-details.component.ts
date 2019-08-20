import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Order} from "../model/order";
import {OrderDetails} from "../model/order-deatils";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderDetails: OrderDetails[] = [];
  order: Order;
  id: string;
  extra = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getOrderDetailsByOrderId(this.id);
    this.getOrderById(this.id);
  }

  public getOrderDetailsByOrderId(id: string) {
    const url = 'http://localhost:8082/orderDetails/getByOrderId/' + id;
    this.http.get<OrderDetails[]>(url).subscribe(res => {
        this.orderDetails = res;
      },
      error => {
        alert('An error on getting all orders');
      });
    console.log(this.orderDetails);
  }

  public getOrderById(id: string) {
    const url = 'http://localhost:8082/orders/' + id;
    this.http.get<Order>(url).subscribe(res => {
        this.order = res
      },
      error => {
        alert('An error in geting order by id');
      });
  }


  changePaidStatus(orderDetails: OrderDetails) {
    const url = 'http://localhost:8082/orderDetails';
    if (orderDetails.status == 'PAID') {
      orderDetails.status = 'NOT_PAID'
    } else {
      orderDetails.status = 'PAID'
    }
    this.http.post(url, orderDetails).subscribe(res => {
      },
      error => {
        alert('An error in updating order paid status');
      });
  }

  deleteOrderDetails(id: number) {
    const url = 'http://localhost:8082/orderDetails/' + id;
    this.http.delete(url).subscribe(res => {
      },
      error => {
        alert('An error in deleting order details');
      });
  }

  changeOrderStatus(order: Order, status: string) {
    const url = 'http://localhost:8082/orders/';
    order.status = status;
    this.http.post(url, order).subscribe(res => {
      },
      error => {
        alert('An error in adding new order');
      });
  }

  recalculate(orderDetails: OrderDetails[], extra: number) {
    const url = 'http://localhost:8082/orderDetails/';
    const toAdd = extra / orderDetails.length;
    orderDetails.forEach(s => {
      s.extra += toAdd;
      this.http.post(url, s).subscribe(res => {
        },
        error => {
          alert('An error in updating order details');
        });
    });
    this.extra = 0;
  }
}
