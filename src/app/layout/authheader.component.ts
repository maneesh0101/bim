import { Component,ElementRef, Renderer, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/index';

@Component({
  selector: 'app-authheader',
  templateUrl: './authheader.component.html',
  providers: [AuthenticationService]
})
export class AuthHeaderComponent implements OnInit {
 isIn = false;
 searchMobile = true;   // store state
    loggedInUser: any = { 'username': 'Guest', 'email': '' };

  constructor(private router: Router, private authenticationService: AuthenticationService) { }


  ngOnInit() {
    var loggedInUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (loggedInUser) {
      this.loggedInUser = loggedInUser;
    }
  }

toggleState() { // click handler
        let bool = this.isIn;
        this.isIn = bool === false ? true : false; 
    }
toggleSearchbar() { // click handler
        let bool = this.searchMobile;
        this.searchMobile = bool === false ? true : false; 
    }
  signOut() {
    this.router.navigate(['/sign-in']);
  }

}
