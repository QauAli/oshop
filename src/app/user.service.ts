import { map } from 'rxjs/operators';
import { AppUser } from './models/app-user';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // constructor(private db: AngularFirestore) {

  // }
  // save(user: firebase.User) {
  //   this.db.collection('users').doc(user.uid).set({
  //     name: user.displayName,
  //     email: user.email
  //   });
  // }

  // get(uid: string){
  //   //return this.db.collection('users').doc(uid).get().subscribe(user=>console.log(user.data()));
  //   return this.db.collection('users').doc(uid).get().pipe(map(user=>user.data()));
  // }

  constructor(private db:AngularFireDatabase) {

   }

   save(user:firebase.User){
     this.db.object('/users/' + user.uid).update({
       name:user.displayName,
       email:user.email
       }
     );
   }

   get(uid:string){
     return this.db.object('/users/'+uid).snapshotChanges();
   }
}
