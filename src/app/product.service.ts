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
    return this.db.object('/products/'+id).snapshotChanges();
  }

  update(productId, product){
  return this.db.object('/products/'+productId).update(product); 
  }

  delete(productId){
    return this.db.object('/products/'+productId).remove();
  }

}
