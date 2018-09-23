import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { ApiHelper } from './apiHelper';

import * as globalVariables from '../shared/globalVariables';
import { ApiResponse } from '../models/apiResponse';
import { Borrowing } from '../models/borrowing';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private logged: BehaviorSubject<boolean> = new BehaviorSubject( localStorage.getItem(globalVariables.userToken) != null );
  private currentUserName: BehaviorSubject<string> = new BehaviorSubject( localStorage.getItem(globalVariables.userName) );
  private currentUserId: BehaviorSubject<string> = new BehaviorSubject( localStorage.getItem(globalVariables.userId) );
  private currentUserToken: BehaviorSubject<string> = new BehaviorSubject( localStorage.getItem(globalVariables.userToken) );
  private currentUserReference: BehaviorSubject<string> = new BehaviorSubject( localStorage.getItem(globalVariables.userReference) );

  private activateUserURL: string = globalVariables.apiAdress + '/user-activation.php';
  private authorizationURL: string = globalVariables.apiAdress + '/user-authorization.php';
  private registerNewUserURL: string = globalVariables.apiAdress + '/user-registration.php';
  private getAllUsersURL: string = globalVariables.apiAdress + '/get-users.php';
  private sendInvitationURL: string = globalVariables.apiAdress + '/send-invitation.php';

  private getBooksURL: string = globalVariables.apiAdress + '/get-books.php';
  private addBookURL: string = globalVariables.apiAdress + '/add-book.php';
  private getBorrowingsURL: string = globalVariables.apiAdress + '/get-borrowings.php';
  private addBorrowingURL: string = globalVariables.apiAdress + '/add-borrowing.php';
  private confirmBorrowingReturnURL: string = globalVariables.apiAdress + '/confirm-borrowing-return.php';

  constructor(private http: Http, private apiHelper: ApiHelper) { }

  public activateUser(pcode: string): Observable<ApiResponse> {
    const url = this.activateUserURL;
    const body = JSON.stringify( {
      code: pcode
    } );
    const options = this.apiHelper.generateRequestOptionsJSON();

    return this.http.post(url, body, options).pipe(
      map((res: Response) => res.json()),
      catchError(this.handleError) 
    );
  }

  public doUserLogin(pusername: string, ppassword: string): Observable<ApiResponse> {
    const url = this.authorizationURL
    const body = JSON.stringify( {
      login: pusername,
      password: ppassword
    } );
    const options = this.apiHelper.generateRequestOptionsJSON();
    console.log(body);
    return this.http.post( url, body, options ).pipe(
      map((res: Response) => {
        console.log(res.json());
        var newToken: string = res.json().result.userToken;      
        var loggedUserId: number = res.json().result.userId;
        var loggedUserReference: string = res.json().result.reference == null ? "" : res.json().result.reference;
        this.logged.next( true );        
        localStorage.setItem(globalVariables.userToken, newToken);
        localStorage.setItem(globalVariables.userName, pusername);
        localStorage.setItem(globalVariables.userId, loggedUserId.toString());
        localStorage.setItem(globalVariables.userReference, loggedUserReference);
        this.currentUserName.next( pusername );        
        this.currentUserId.next( loggedUserId.toString() );
        this.currentUserReference.next( loggedUserReference );
        this.currentUserToken.next( newToken ); 
        return res.json();
      }),
      catchError(this.handleError)
    );
  }

  public registerNewUser(plogin: string, ppassword: string, pemail: string, preference: number): Observable<ApiResponse> {
    const url = this.registerNewUserURL;
    const body = JSON.stringify( {
      login: plogin,
      password: ppassword,
      email: pemail,
      reference: preference
    } );
    const options = this.apiHelper.generateRequestOptionsJSON();

    return this.http.post(url, body, options).pipe(
      map((res: Response) => res.json()),
      catchError(this.handleError) 
    );
  }

  public getAllUsers(): Observable<ApiResponse> {
    const url = this.getAllUsersURL;
    const options = this.apiHelper.generateRequestOptionsJSON();
    const body = JSON.stringify({ userToken: this.currentUserToken.getValue() });
    return this.http.post(url, body, options).pipe(
      map((res: Response) => res.json()),
      catchError(this.handleError) 
    );
  }


  public getAllMyBooks(): Observable<ApiResponse> {
    const url = this.getBooksURL;
    const body = JSON.stringify( {
      userId: this.currentUserId.getValue(),
      userToken: this.currentUserToken.getValue()
    } );
    console.log(body);
    const options = this.apiHelper.generateRequestOptionsJSON();

    return this.http.post(url, body, options).pipe(
      map((res: Response) => res.json()),
      catchError(this.handleError) 
    );
  }


  public getBorrowedBooks(fromMeToOthers: boolean): Observable<ApiResponse> {
    const url = this.getBorrowingsURL;
    const body = JSON.stringify( {
      userId: this.currentUserId.getValue(),
      userToken: this.currentUserToken.getValue(),
      borrowedToOthers: fromMeToOthers
    } );
    const options = this.apiHelper.generateRequestOptionsJSON();

    return this.http.post(url, body, options).pipe(
      map((res: Response) => res.json()),
      catchError(this.handleError) 
    );
  }


  public addBorrowing(newBorrowing: Borrowing): Observable<ApiResponse> {
    const url = this.addBorrowingURL;
    newBorrowing['userToken'] = this.currentUserToken.getValue();
    const body = JSON.stringify( newBorrowing );
    const options = this.apiHelper.generateRequestOptionsJSON();
    return this.http.post(url, body, options).pipe(
      map((res: Response) => res.json()),
      catchError(this.handleError) 
    );
  }


  public confirmBorrowingReturn(pbid: number): Observable<ApiResponse> {
    const url = this.confirmBorrowingReturnURL;
    const body = JSON.stringify( { borrowing_id: pbid, userToken: this.currentUserToken.getValue() } );
    console.log(body);
    const options = this.apiHelper.generateRequestOptionsJSON();
    return this.http.post(url, body, options).pipe(
      map((res: Response) => res.json()),
      catchError(this.handleError) 
    );
  }


  public addBook(newBook: Book): Observable<ApiResponse> {
    const url = this.addBookURL;
    newBook['userToken'] = this.currentUserToken.getValue();
    const body = JSON.stringify( newBook );    
    const options = this.apiHelper.generateRequestOptionsJSON();
    console.log(body);
    return this.http.post(url, body, options).pipe(
      map((res: Response) => res.json()),
      catchError(this.handleError) 
    );
  }

  public sendInvitation(plogin: string, pemail: string, puserid: number): Observable<ApiResponse> {
    const url = this.sendInvitationURL;
    const body = JSON.stringify( { login: plogin, email: pemail, userId: puserid } );
    console.log(body);
    const options = this.apiHelper.generateRequestOptionsJSON();
    return this.http.post(url, body, options).pipe(
      map((res: Response) => res.json()),
      catchError(this.handleError) 
    );
  }

  public getCurrentUserName() {
    return this.currentUserName
  }

  public getCurrentUserId() {
    return this.currentUserId
  }

  public getCurrentUserReference() {
    return this.currentUserReference
  }

  public getCurrentUserToken() {
    return this.currentUserToken
  }

  public isLogged() {
    return this.logged;
  }

  public doUserLogout() {
    localStorage.removeItem(globalVariables.userToken);
    this.logged.next( false );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
