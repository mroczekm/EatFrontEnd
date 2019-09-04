import {Injectable} from '@angular/core';
import {Order} from "../model/order";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderDetails} from "../model/order-deatils";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /*private URL = 'http://localhost:8080/eatitapp';*/
  private URL = 'http://localhost:8082';
  private ORDERS_ALL = `${this.URL}\\orders\\all`;
  private ORDER_ADD_GET_DEL = `${this.URL}\\orders\\`;
  private ORDER_DETAILS_ADD_GET_DEL = `${this.URL}\\orderDetails\\`;
  private ORDER_DETAILS_BY_ID = `${this.URL}\\orderDetails\\getByOrderId\\`;
  private USER_BY_USERNAME = `${this.URL}\\users\\byUserName\\`;
  private USER_POST = `${this.URL}\\users\\add`;
  private USER_VALIDATE = `${this.URL}\\users\\validateLogin`;


  constructor(private http: HttpClient) {
  }
  validate(username: String, password: String): Observable<boolean>{
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ':' + password)});
    return this.http.get<boolean>(this.USER_VALIDATE, {headers});
  }
  /* *** ORDER *** */
  getAllOrder(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ORDERS_ALL);
  }

  addNewOrder(order: Order): Observable<any> {
    return this.http.post(this.ORDER_ADD_GET_DEL, order);
  }

  deleteOrder(id: number): Observable<any> {
    // @ts-ignore
    return this.http.delete(this.ORDER_ADD_GET_DEL + id);
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(this.ORDER_ADD_GET_DEL + id);
  }

  changeOrderStatus(order: Order): Observable<any> {
    return this.http.post(this.ORDER_ADD_GET_DEL, order);
  }

  /* *** ORDER DEATILS *** */
  getOrderDetailsByOrdersId(id: string): Observable<OrderDetails[]> {
    return this.http.get<OrderDetails[]>(this.ORDER_DETAILS_BY_ID + id);
  }

  changePaidStatus(orderDetails: OrderDetails): Observable<any> {
    return this.http.post(this.ORDER_DETAILS_ADD_GET_DEL, orderDetails);
  }

  deleteOrderDetails(id: number): Observable<any> {
    return this.http.delete(this.ORDER_DETAILS_ADD_GET_DEL + id);
  }

  recalculate(orderDetails: OrderDetails): Observable<any> {
    return this.http.post(this.ORDER_DETAILS_ADD_GET_DEL, orderDetails);
  }

  addToOrder(orderDetails: OrderDetails): Observable<any> {
    return this.http.post(this.ORDER_DETAILS_ADD_GET_DEL, orderDetails);
  }

  getOrdersByUserId(id: number): Observable<OrderDetails[]> {
    return this.http.get<OrderDetails[]>(this.ORDER_DETAILS_BY_ID + id);

  }

  /* *** USER *** */
  getUserByUsername(username: string): Observable<User> {
    console.log(this.USER_BY_USERNAME + username);
    return this.http.get<User>(this.USER_BY_USERNAME + username);
  }

  singInUser(user: User): Observable<any> {
    return this.http.post(this.USER_POST, user);
  }
}
