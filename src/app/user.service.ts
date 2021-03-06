import { map, switchMap } from 'rxjs/operators';
import { AppUser } from './models/app-user';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  appUser:AppUser;

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

  // constructor(private db:AngularFireDatabase, public authService:AuthService) {
  //   authService.user$.subscribe(user=>{
  //     this.get(user.uid).subscribe(appUser=>{
  //       this.appUser$ = appUser.payload.val();
  //      // console.log(appUser.payload.val());
  //     })
  //   });

  //  }

  constructor(private db: AngularFireDatabase, public authService: AuthService) {

    this.authService.user$.pipe(switchMap(user =>{
      if(user)
        return this.get(user.uid).valueChanges();

        return of(null);
    }),map(u=>{
      return u;
    })).subscribe(appUser=>this.appUser = appUser);
  }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    }
    );
  }

  get(uid: string):AngularFireObject<AppUser>{
    return this.db.object('/users/' + uid);
  }
}
