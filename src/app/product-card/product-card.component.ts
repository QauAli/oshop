import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product : Product;
  @Input('show-actions') showActions;
  @Input('shopping-cart') shoppingCart:ShoppingCart;

  constructor(private shoppingCartService:ShoppingCartService) { 
  }

  ngOnInit() {
  }

  addToCart(){
    this.shoppingCartService.addToCart(this.product);
  }
}