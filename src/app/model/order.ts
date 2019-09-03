import {User} from "./user";

export class Order {
  id: number;
  userId: number;
  user: User;
  date: Date;
  name: string;
  description: string;
  status: string;


  constructor(date: Date, userId: number, user: User,  name: string, description: string, status: string) {
    this.date = date;
    this.userId = userId;
    this.user = user;
    this.name = name;
    this.description = description;
    this.status = status;
  }


}

