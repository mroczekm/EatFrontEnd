import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from '../../model/order';
import {ApiService} from "../../service/api.service";
import {User} from "../../model/user";
import {Router} from "@angular/router";
import {delay} from "rxjs/operators";
import {MatSnackBar} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  orderForm: FormGroup;
  order: Order;

  constructor(private api: ApiService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit() {

  }

  initForm() {
    this.orderForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['']
    },{

    })
  }

  addNewOrder(): void {
    this.order = new Order(new Date(), this.currentUser.id, this.currentUser, this.orderForm.get('name').value,  this.orderForm.get('description').value, 'Otwarte');
    this.api.addNewOrder(this.order).subscribe(res => {
      this.orderForm.reset();
      this.orderForm.untouched;
      this.snackBar.open("Utworzono nowe zamówienie", "" , {duration: 4000});
      this.uploaded.emit();
    });
  }

}

export interface NewOrder {
  name: string;
  description: string;
}
