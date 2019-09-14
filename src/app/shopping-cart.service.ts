import { ShoppingCart } from './models/shopping-cart';
import { take, map } from 'rxjs/operators';
import { Product } from './models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable, OnInit } from '@angular/core';
import { Item } from './models/item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements OnInit{

  constructor(private db:AngularFireDatabase) {
   }

   ngOnInit(): void {
  }

  private create(){
   return this.db.list('/shopping-carts').push({
      createdDate:new Date().getTime()
    })
  }

  async getcart(){
    let cartId = await this.CreateOrUpdateCart();
    return this.db.object<{ [key: string]: Item; }>('/shopping-carts/'+cartId).valueChanges().pipe(map(cart=>new ShoppingCart(cart)));
  }

  private getItem(cartId, productId){
    return this.db.object<Item>('/shopping-carts/'+cartId+'/items/'+productId);
  }

  private async CreateOrUpdateCart():Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if(!cartId){
      let cart = await this.create();
      localStorage.setItem('cartId',cart.key);
      return cart.key;
    }
    return cartId;
  }

  async removeFromCart(product:Product){
    this.updateItemQuantity(product, -1); //no await because we dont need result value otherwise you can use await also
  }

  async addToCart(product:Product){
    this.updateItemQuantity(product,1);//no await because we dont need result value otherwise you can use await also
}

  async updateItemQuantity(product:Product, change:number){

    let cartId = await this.CreateOrUpdateCart();
    let item$ = this.getItem(cartId, product.key);
    let item$$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1),map(i=>{
      let realItem:Item = i;
      return realItem;
    })).subscribe(item=>{
      if(!item){
        item$$.update({
          product:product,
          quantity: 1
        })
      }else{
        item$$.update({
          product:product,
          quantity: item.quantity + change
        })
      }
     
    })

  }



}
