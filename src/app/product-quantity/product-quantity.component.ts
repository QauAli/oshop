import { Product } from './../models/product';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product:Product;
  @Input('shopping-cart') shoppingCart:ShoppingCart;

  constructor(private shoppingCartService:ShoppingCartService) { 
  }

  ngOnInit() {
  }

  // getQuantity(){
  //   this.shoppingCart.getItemQuantity(this.product);
  // }

  addToCart(){
    this.shoppingCartService.addToCart(this.product);
  }

  removeFromCart(){
    this.shoppingCartService.removeFromCart(this.product);

  }
}
