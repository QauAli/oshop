import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  //user:firebase.User;
 

  constructor(public authService:AuthService) { 
    //afAuth.authState.subscribe(x=>{
     // this.user = x;
     // console.log(this.user);
    //})
    
  }

  logout(){
    this.authService.logout();

  }

}
