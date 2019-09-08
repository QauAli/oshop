import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) {

   }

   getCategories(){
     //console.log(this.db.list('/categories').valueChanges());
     //return this.db.list('/categories', ref=>ref.orderByChild('name')).valueChanges(); already sorted in firebase

     return this.db.list('/categories').snapshotChanges();
     
   }
}
