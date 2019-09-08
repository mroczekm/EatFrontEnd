import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order} from "../../model/order";
import {HttpClient} from "@angular/common/http";
import {OrderDetails} from "../../model/order-deatils";
import {ApiService} from "../../service/api.service";
import {MatSnackBar} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  orderDetailsForm: FormGroup;
  orderDetails: OrderDetails;
  model: newOrderDetails = {
    dish: '',
    price: null,
    description: '',
    extra: null
  }

  constructor(private api: ApiService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
    this.orderDetailsForm = this.fb.group({
      dish: ['', [Validators.required]],
      price: [null, [Validators.required]],
      description: [''],
      extra: [null]
    }, {

    })
  }

  addToOrder() {
    this.orderDetails = new OrderDetails(Number(sessionStorage.getItem('userId')), this.id, this.orderDetailsForm.get('dish').value,  this.orderDetailsForm.get('price').value, this.orderDetailsForm.get('description').value, this.orderDetailsForm.get('extra').value, 'NOT_PAID');
    console.log(this.orderDetails);
    this.api.addToOrder(this.orderDetails).subscribe(res => {
        this.uploaded.emit();
        this.snackBar.open("Dodawno do zamówienia", "" , {duration: 4000});
        this.orderDetailsForm.reset();
        this.orderDetailsForm.markAsUntouched();
      },
      error => {
        alert('An error in adding new order');
      });
  }
  onKeydown(event) {
    if (event.key === "Enter") {
      this.addToOrder();
    }
  }
}
