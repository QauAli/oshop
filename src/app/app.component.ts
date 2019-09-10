import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(){

    //this is delay so if you want than move it to constructor
    this.afAuth.user$.subscribe(user=>{
      if(!user)
        return;

        this.userService.save(user);
        let returnUrl = localStorage.getItem('returnUrl');

        if(!returnUrl)
          return;

        localStorage.removeItem('returnUrl');
        this.router.navigateByUrl(returnUrl);
      
    })

  }

  
  constructor(private afAuth:AuthService, private router:Router, private userService:UserService){

    // this.afAuth.user$.subscribe(user=>{
    //   if(!user)
    //     return;

    //     this.userService.save(user);
    //     let returnUrl = localStorage.getItem('returnUrl');

    //     if(!returnUrl)
    //       return;

    //     localStorage.removeItem('returnUrl');
    //     this.router.navigateByUrl(returnUrl);
      
    // })


  }

}
