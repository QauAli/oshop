import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product;
  @Input('show-actions') showActions;
  @Input('shopping-cart') shoppingCart;

  constructor(private shoppingCartService:ShoppingCartService) { 
  }

  ngOnInit() {
  }

  getQuantity(){
    if(!this.shoppingCart) return 0;
    
    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;


  }

  addToCart(){
    this.shoppingCartService.addToCart(this.product);
  }

  removeFromCart(){
    this.shoppingCartService.removeFromCart(this.product);

  }


}
