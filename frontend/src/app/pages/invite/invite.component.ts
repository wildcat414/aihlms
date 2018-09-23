import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  showSpinner: boolean = false;
  currentUserLogin: string;
  currentUserId: number;
  toInviteEmail: string;
  message: string = "";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getCurrentUserName().subscribe( user => this.currentUserLogin = user );
    this.userService.getCurrentUserId().subscribe( userId => this.currentUserId = parseInt(userId) );
  }

  sendInvitation() {
    console.log("invitation");
    this.showSpinner = true;
    this.message = "Trwa przetwarzanie...";
    this.userService.sendInvitation(this.currentUserLogin, this.toInviteEmail,  this.currentUserId).subscribe(data => {
      console.log(data);
      this.showSpinner = false;
      this.message = "Zaproszenie wysłane!";
    }, error => {
      this.showSpinner = false;
    });
  }

}
