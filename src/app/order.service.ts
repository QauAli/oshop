
import { Router } from '@angular/router';
import { Order } from './models/order';
import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(private db:AngularFireDatabase,
     private shoppingCartService:ShoppingCartService,
     private Router:Router) {
   
  }

   putOrder(order:Order){
    //console.log(order);
     this.db.list<Order>('/orders/').push(order);
     this.shoppingCartService.clearCart();
     this.Router.navigateByUrl('order-success');
     
   }

   getOrders(){
    return this.db.list<Order>('/orders/').valueChanges();
  }

}
