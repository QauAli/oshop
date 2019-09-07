import { AdminAuthGaurdService } from './admin-auth-gaurd.service';
import { AuthGaurdService } from './auth-gaurd.service';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { LoginComponent } from './login/login.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { OrderSuccessComponent } from './order-success/order-success.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'products',component:ProductsComponent},
  {path:'shopping-cart', component:ShoppingCartComponent},

  {path:'check-out',component:CheckOutComponent, canActivate:[AuthGaurdService]},
  {path:'order-success', component:OrderSuccessComponent, canActivate:[AuthGaurdService]},
  {path:'my/orders',component:MyOrdersComponent, canActivate:[AuthGaurdService]},

  {path:'admin/products',component:AdminProductsComponent, canActivate:[AuthGaurdService]},
  {path:'admin/orders',component:AdminOrdersComponent, canActivate:[AuthGaurdService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
