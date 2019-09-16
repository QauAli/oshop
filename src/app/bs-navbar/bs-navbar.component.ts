import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { UserService } from './../user.service';
import { AppUser } from './../models/app-user';
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
export class BsNavbarComponent implements OnInit{

  cart$: Observable<ShoppingCart>;
  quantity;
  
  
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  
  async ngOnInit(){

    await this.delay(3000);

    this.cart$ = await this.shoppingCartService.getcart();

    
    //  (await this.shoppingCartService.getcart())
    //  .subscribe(cart=>{
    //    let cart1 = new ShoppingCart(cart.items);
    //    this.quantity = cart1.quantity

    //  });
 
  }

  constructor(public authService:AuthService, public userService:UserService, public shoppingCartService:ShoppingCartService) {   
  
  

  }

  logout(){
    this.authService.logout();

  }


}
