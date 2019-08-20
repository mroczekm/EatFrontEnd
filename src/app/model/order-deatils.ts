import {User} from "./user";


export class OrderDetails {
  id: number;
  userId: number;
  user: User;
  orderId: number;
  dish: string;
  price: number;
  description: string;
  extra: number;
  status: string;


  constructor(userId: number, orderId: number, dish: string, price: number, description: string, extra: number, status: string) {
    this.userId = userId;
    this.orderId = orderId;
    this.dish = dish;
    this.price = price;
    this.description = description;
    this.extra = extra;
    this.status = status;
  }
}

