import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  codeToActivate: string = "";
  message: string = "";
  showSpinner: boolean = false;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let code = params['code'];
      if(code != undefined) {
        this.codeToActivate = code;
        this.registerUser();
      }
      console.log(code);
    });
  }

  registerUser() {
    console.log("activate user request");
    this.showSpinner = true;
    this.message = "Trwa przetwarzanie...";
    this.userService.activateUser(this.codeToActivate).subscribe(data => {
      console.log(data);
      this.showSpinner = false;
      this.message = "Konto zostało aktywowane pomyślnie!";
    }, error => {
      this.showSpinner = false;
      this.message = "Wystąpił błąd podczas aktywacji konta!";
    });
  }

}
