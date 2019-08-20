import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {Router, RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {HttpClientModule} from '@angular/common/http';
import {OrdersListComponent} from './orders-list/orders-list.component';
import {FormsModule} from '@angular/forms';
import { NewOrderComponent } from './orders-list/new-order/new-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { NewOrderDetailsComponent } from './order-details/new-order-details/new-order-details.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import {AuthGaurdService} from "./service/auth-gaurd.service";

const appRoutes: Routes = [
  {
    path: '',
    component: OrdersListComponent,
    canActivate:[AuthGaurdService]
  },
  {
    path: 'orders',
    component: OrdersListComponent,
    canActivate:[AuthGaurdService]
  },
  {
    path: 'orderDeatails/:id',
    component: OrderDetailsComponent,
    canActivate:[AuthGaurdService]
  },
  {
    path: 'myOrders',
    component: MyOrdersComponent,
    canActivate:[AuthGaurdService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate:[AuthGaurdService]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    OrdersListComponent,
    NewOrderComponent,
    OrderDetailsComponent,
    NewOrderDetailsComponent,
    MyOrdersComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
