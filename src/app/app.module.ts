import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {Router, RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {OrdersListComponent} from './orders-list/orders-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NewOrderComponent} from './orders-list/new-order/new-order.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {NewOrderDetailsComponent} from './order-details/new-order-details/new-order-details.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {AuthGaurdService} from "./service/auth-gaurd.service";
import {BasicAuthHtppInterceptorService} from "./service/basic-auth-htpp-interceptor-service.service";
import {OrderHistoryComponent} from './order-history/order-history.component';
//Angular Material Components
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
const appRoutes: Routes = [
  {
    path: '',
    component: OrdersListComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path: 'orders',
    component: OrdersListComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path: 'orderDeatails/:id',
    component: OrderDetailsComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path: 'myOrders',
    component: MyOrdersComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path: 'orderHistory',
    component: OrderHistoryComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGaurdService]
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
    LogoutComponent,
    OrderHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  exports:[
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

