import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  displayRegisterDialog: boolean = false;
  existingUserLogin: string = "";
  existingUserPassword: string = "";
  newUserEmail: string = "";
  newUserLogin: string = "";
  newUserPassowrd: string = "";
  showSpinner: boolean = false;

  userIsLogged: boolean = false;

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit() {
    this.userService.isLogged().subscribe( logged => this.userIsLogged = logged );
  }

  loginUser() {
    console.log("login user request");
    this.showSpinner = true;
    this.userService.doUserLogin(this.existingUserLogin, this.existingUserPassword).subscribe(data => {
      console.log(data);
      this.showSpinner = false;
      if(this.userIsLogged) {
        this.router.navigate(["/home"]);
      }
    }, error => {
      this.showSpinner = false;
      if(this.userIsLogged) {
        this.router.navigate(["/home"]);
      }
    });
  }

  redirectToRegistration() {
    this.router.navigate(["/register"]);
  }

  showDialog() {
    this.displayRegisterDialog = true;
  }

}
