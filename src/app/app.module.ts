import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {Router, RouterModule, Routes} from "@angular/router";
import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {HttpClientModule} from "@angular/common/http";
import {OrdersListComponent} from './orders-list/orders-list.component';

const appRoutes: Routes = [
  {
    path: '',
    component: OrdersListComponent
  },
  {
    path: 'eatapp',
    component: OrdersListComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    OrdersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
