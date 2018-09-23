import { Component,  OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { Book } from '../../models/book';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[];
  selectedBook: Book;
  bookToAdd: Book = new Book();
  displayDetailsDialog: boolean = false;
  displayAddBookDialog: boolean = false;

  constructor(private bookService: UserService) { }

  ngOnInit() {
      this.bookService.getAllMyBooks().subscribe(data => {
        console.log(data);
        this.books = data.result;
      });
  }

  showDetailsDialog() {
    this.displayDetailsDialog = true;
  }

  showAddBookDialog() {
    this.displayAddBookDialog = true;
  }

  addNewBook() {
    this.bookService.addBook(this.bookToAdd).subscribe(data => {
      console.log(data);
      this.displayAddBookDialog = false;
      this.bookToAdd = new Book();
    });
  }
}
