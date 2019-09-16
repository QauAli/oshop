import { Order } from './../models/order';
import { OrderService } from './../order.service';

import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {


  cart: ShoppingCart;
  subscriptionCart: Subscription;

  constructor(public shoppingCartService: ShoppingCartService, private orderService: OrderService) { }

  async ngOnInit() {

    this.subscriptionCart = (await this.shoppingCartService.getcart()).subscribe(cart => {
      this.cart = cart;
    });
  }

  save(formData) {
    //console.log(formData);
    let order: Order = {
      name: formData.name,
      city: formData.city,
      address: formData.address,
      userId: localStorage.getItem('userId'),
      date:  + new Date().getTime(),
      items: this.cart.items,
      totalPrice : this.cart.totalPrice
    };


    this.orderService.putOrder(order);


  }

  ngOnDestroy(): void {
    this.subscriptionCart.unsubscribe();
  }

}
