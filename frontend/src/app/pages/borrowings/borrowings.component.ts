import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { Book } from '../../models/book';
import { Borrowing } from '../../models/borrowing';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-borrowings',
  templateUrl: './borrowings.component.html',
  styleUrls: ['./borrowings.component.css']
})
export class BorrowingsComponent implements OnInit {

  booksBorrowedToOthers: Book[];
  booksBorrowedByMe: Book[];
  selectedBook: Book;
  bookToAdd: Book = new Book();
  newBorrowing: Borrowing = new Borrowing();
  users: SelectItem[] = [];
  allMyBooks: SelectItem[] = [];
  displayDetailsDialog: boolean = false;
  displayBorrowBookDialog: boolean = false;
  currentUserId: number;
  currentUserReference: number;

  constructor(private bookService: UserService, private userService: UserService) { }

  ngOnInit() {
      this.userService.getCurrentUserId().subscribe( userId => this.currentUserId = parseInt(userId) );
      this.userService.getCurrentUserReference().subscribe( userRef => this.currentUserReference = parseInt(userRef) );

      this.bookService.getBorrowedBooks(true).subscribe(data => {
        console.log(data);
        this.booksBorrowedToOthers = data.result;
      });
      this.bookService.getBorrowedBooks(false).subscribe(data => {
        console.log(data);
        this.booksBorrowedByMe = data.result;
      });
      this.bookService.getAllMyBooks().subscribe(data => {
        console.log(data);
        if(data.result != null) {
          data.result.forEach(elem => {
            if(this.currentUserId != elem.borrower) {
              this.allMyBooks.push({label: elem.title, value: elem.id})
            }            
          });
        }        
      });
      this.userService.getAllUsers().subscribe(data => {
        console.log(data);
        if(data.result != null) {
          data.result.forEach(elem => {
            if(this.currentUserId != elem.id && this.currentUserReference != elem.id && this.currentUserId != parseInt(elem.reference)) {
              this.users.push({label: elem.login, value: elem.id})
            }
          });
        }
      });
  }

  showDetailsDialog() {
    this.displayDetailsDialog = true;
  }

  showBorrowBookDialog() {
    this.displayBorrowBookDialog = true;
  }

  saveNewBorrowing() {
    console.log(this.newBorrowing);
    if(this.newBorrowing.borrower != null) {
      this.newBorrowing.borrower_external = null;
    }
    this.bookService.addBorrowing(this.newBorrowing).subscribe(data => {
      console.log(data);
    });
    this.displayBorrowBookDialog = false;
  }

  confirmSelectedBookReturn() {
    this.bookService.confirmBorrowingReturn(this.selectedBook.borrowing_id).subscribe(data => {
      console.log(data);
      this.displayDetailsDialog = false;
    });
  }

}
