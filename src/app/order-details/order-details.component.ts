import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Order} from "../model/order";
import {OrderDetails} from "../model/order-deatils";
import {ApiService} from "../service/api.service";

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

  constructor(private route: ActivatedRoute, private api: ApiService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getOrderDetailsByOrderId(this.id);
    this.getOrderById(this.id);
  }

  public getOrderDetailsByOrderId(id: string) {
    this.api.getOrderDetailsByOrdersId(id).subscribe(res => {
        this.orderDetails = res;
      },
      error => {
        alert('An error on getting all orders');
      });
    console.log(this.orderDetails);
  }

  public getOrderById(id: string) {
    this.api.getOrderById(id).subscribe(res => {
        this.order = res
      },
      error => {
        alert('An error in geting order by id');
      });
  }


  changePaidStatus(orderDetails: OrderDetails) {
    if (orderDetails.status == 'PAID') {
      orderDetails.status = 'NOT_PAID'
    } else {
      orderDetails.status = 'PAID'
    }
    this.api.changePaidStatus(orderDetails).subscribe(res => {
      },
      error => {
        alert('An error in updating order paid status');
      });
  }

  deleteOrderDetails(id: number) {
    this.api.deleteOrderDetails(id).subscribe(res => {
      },
      error => {
        alert('An error in deleting order details');
      });
  }

  changeOrderStatus(order: Order, status: string) {
    order.status = status;
    this.api.changeOrderStatus(order).subscribe(res => {
      },
      error => {
        alert('An error in adding new order');
      });
  }

  recalculate(orderDetails: OrderDetails[], extra: number) {
    const toAdd = extra / orderDetails.length;
    orderDetails.forEach(s => {
      s.extra += toAdd;
      this.api.recalculate(s).subscribe(res => {
        },
        error => {
          alert('An error in updating order details');
        });
    });
    this.extra = 0;
  }
}
