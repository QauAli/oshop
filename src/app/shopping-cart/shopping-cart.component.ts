

import { async } from '@angular/core/testing';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  
  cart$;

  constructor(public shoppingCartService:ShoppingCartService) { }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async ngOnInit() {

  await this.delay(500);
  this.cart$ =  await this.shoppingCartService.getcart();

  }

  clearCart(){
    this.shoppingCartService.clearCart();
  }

}
