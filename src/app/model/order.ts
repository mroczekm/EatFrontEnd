export class Order {
  id: number;
  date: Date;
  name: string;
  description: string;
  status: string;

  constructor(date: Date, name: string, description: string, status: string) {
    this.date = date;
    this.name = name;
    this.description = description;
    this.status = status;
  }
}

