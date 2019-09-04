import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from '../../model/order';
import {ApiService} from "../../service/api.service";
import {User} from "../../model/user";
import {Router} from "@angular/router";
import {delay} from "rxjs/operators";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  @Output()
  uploaded = new EventEmitter<string>();

  @Input()
  currentUser: User;

  order: Order;
  model: NewOrder = {
    name: '',
    description: ''
  };

  constructor(private api: ApiService,
              private snackBar: MatSnackBar,) {
  }

  ngOnInit() {
  }

  addNewOrder(): void {
    this.order = new Order(new Date(), this.currentUser.id, this.currentUser, this.model.name, this.model.description, 'Otwarte');
    this.api.addNewOrder(this.order).subscribe(res => {
        this.model.description = '';
        this.model.name = '';
      this.snackBar.open("Utworzono nowe zamówienie", "" , {duration: 4000});
      this.uploaded.emit();
    });
  }
}

export interface NewOrder {
  name: string;
  description: string;
}
