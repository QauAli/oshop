import { Product } from './models/product';
import { map } from 'rxjs/operators';

import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product);
  }

  getProducts(){
    return this.db.list('/products').snapshotChanges();
  }

  getCategoryProducts(category){
    return this.db.list('/products/'+category).snapshotChanges();
  }

  getProduct(id){
    return this.db.object<Product>('/products/'+id).snapshotChanges().pipe(map(product=>{
      return {
        key : id,
        ...product.payload.val()
      }
    }));
  }

  update(productId, product){
  return this.db.object('/products/'+productId).update(product); 
  }

  delete(productId){
    return this.db.object('/products/'+productId).remove();
  }

}
