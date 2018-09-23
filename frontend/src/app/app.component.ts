import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  isNavbarCollapsed:boolean = true;
  userIsLoggedIn: boolean = false;
  currentUserName: string = "";

  constructor(private userService: UserService, private router: Router) {
    
  }

  ngOnInit() {
    this.userService.isLogged().subscribe( logged => this.userIsLoggedIn = logged );
    this.userService.getCurrentUserName().subscribe( username => this.currentUserName = username );
  }

  logout() {
    this.userService.doUserLogout();
    this.router.navigate(["/"]);
  }

}
