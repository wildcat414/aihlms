import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule, Button } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { TableModule, Table } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { BooksComponent } from './pages/books/books.component';
import { BorrowingsComponent } from './pages/borrowings/borrowings.component';
import { AccountComponent } from './pages/account/account.component';
import { ActivateComponent } from './pages/activate/activate.component';
import { ApiHelper } from './services/apiHelper';
import { UserService } from './services/user.service';
import { RegisterComponent } from './pages/register/register/register.component';
import { InviteComponent } from './pages/invite/invite.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-by-reference/:referenceId/:email', component: RegisterComponent },
  { path: 'books', component: BooksComponent },
  { path: 'borrowings', component: BorrowingsComponent },
  { path: 'account', component: AccountComponent },
  { path: 'invite', component: InviteComponent },
  { path: 'activate/:code', component: ActivateComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NotfoundComponent,
    BooksComponent,
    BorrowingsComponent,
    AccountComponent,
    ActivateComponent,
    RegisterComponent,
    InviteComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, useHash: true } // <-- debugging purposes only
    ),
    FormsModule,
    HttpModule,
    HttpClientModule,
    DialogModule,
    ButtonModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    DataViewModule,
    DropdownModule,
    PanelModule,
    TableModule,
    InputTextModule
  ],
  providers: [
    ApiHelper,
    UserService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}
