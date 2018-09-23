import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  showSpinner: boolean = false;
  newUserEmail: string = "";
  newUserLogin: string = "";
  newUserPassword: string = "";
  newUserReference: number = 0;
  message: string = "";

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let referenceId = params['referenceId'];
      let email = params['email'];
      if(referenceId != undefined) {
        this.newUserReference = referenceId;
      }
      if(email != undefined) {
        this.newUserEmail = email;
      }
      console.log(referenceId);
    });
  }

  registerUser() {
    console.log("register user request");
    this.showSpinner = true;
    this.message = "Trwa przetwarzanie...";
    this.userService.registerNewUser(this.newUserLogin, this.newUserPassword, this.newUserEmail, this.newUserReference).subscribe(data => {
      console.log(data);
      this.showSpinner = false;
      this.message = "Link aktywacyjny wysłany!";
    }, error => {
      this.showSpinner = false;
    });
  }

}
