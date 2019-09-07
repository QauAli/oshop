import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate{
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot,
  state: import("@angular/router").RouterStateSnapshot) {
    return this.authService.user$.pipe(map(user=>{
      if(user) return true;
      
      this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
      return false;
    }))
    throw new Error("Method not implemented.");
  }

 /* canActivate(route: import("@angular/router").ActivatedRouteSnapshot,
   state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    throw new Error("Method not implemented.");
  }*/



  constructor(private authService:AuthService, private router:Router) {

   }
}
