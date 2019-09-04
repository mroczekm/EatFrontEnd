import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Order} from "../model/order";
import {OrderDetails} from "../model/order-deatils";
import {ApiService} from "../service/api.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderDetails: OrderDetails[] = [];
  order: Order;
  id: string;
  extra: number;
  total: number;
  text: string;
  displayedColumns: string[] = ['position', 'user', 'dish', 'description', 'price', 'extra', 'total', 'status', 'action' ];


  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private snackBar: MatSnackBar,) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getOrderDetailsByOrderId(this.id);
    this.getOrderById(this.id);
  }

  public getOrderDetailsByOrderId(id: string) {
    this.api.getOrderDetailsByOrdersId(id).subscribe(res => {
        this.orderDetails = res;
        this.total = res.reduce((prev,cur) => prev + cur.price + cur.extra,0);
      },
      error => {
        alert('An error on getting all orders');
      });

  }

  getOrderById(id: string) {
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
      this.text = 'Zmieniono status na NIEZAPŁACONE';
    } else {
      orderDetails.status = 'PAID'
      this.text = 'Zmieniono status na ZAPŁACONE';
    }
    this.api.changePaidStatus(orderDetails).subscribe(res => {
        this.snackBar.open(this.text, "" , {duration: 4000});
      },
      error => {
        alert('An error in updating order paid status');
      });
  }

  deleteOrderDetails(id: number) {
    this.api.deleteOrderDetails(id).subscribe(res => {
        this.getOrderDetailsByOrderId(this.id);
        this.snackBar.open("Usunięto pozycje z zamówienia", "" , {duration: 4000});
      },
      error => {
        alert('An error in deleting order details');
      });
  }

  changeOrderStatus(order: Order, status: string) {
    order.status = status;
    this.api.changeOrderStatus(order).subscribe(res => {
        this.getOrderDetailsByOrderId(this.id);
      },
      error => {
        alert('An error in adding new order');
      });
  }

  recalculate(orderDetails: OrderDetails[], extra: number) {
    this.getOrderDetailsByOrderId(this.id);
    const toAdd = extra / orderDetails.length;
    orderDetails.forEach(s => {
      s.extra += toAdd;
      this.api.recalculate(s).subscribe(res => {
          this.total = Number(this.total) + Number(this.extra);
          this.extra = 0
          this.snackBar.open("Przeliczono koszty zamówienia", "" , {duration: 4000});
        },
        error => {
          alert('An error in updating order details');
        });
    });
   ;



  }

}
