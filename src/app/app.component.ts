import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private afAuth:AuthService, private router:Router, private userService:UserService){

    afAuth.user$.subscribe(user=>{
      if(user){

        //console.log(user);
        userService.save(user);

        userService.get(user.uid);

        let returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    })
  }



}
