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

const appRoutes: Routes = [
  {
    path: '',
    component: OrdersListComponent
  },
  {
    path: 'orders',
    component: OrdersListComponent
  },
  {
    path: 'orderDeatails/:id',
    component: OrderDetailsComponent
  },
  {
    path: 'myOrders',
    component: MyOrdersComponent
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
    MyOrdersComponent
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
