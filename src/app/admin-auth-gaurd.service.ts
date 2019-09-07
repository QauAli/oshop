import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGaurdService {
  // canActivate():Observable<boolean>{
  //   // return this.authService.user$.pipe(
  //   //   switchMap(user=>{
  //   //     return this.userService.get(user.uid);
  //   //   })).pipe(map(appUser=>{
  //   //     return appUser.isAdmin;
  //   //   }))

  //   this.authService.user$.pipe(map(user=>{
  //     this.userService.get(user.uid).pipe(map(data=>{
  //       if(data.isAdmin) return true;
        
  //       return false;
  //     }))
  //   }));
  
  
  constructor(private authService:AuthService, private userService:UserService) {
     

  }
}
