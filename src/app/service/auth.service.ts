import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _loginUrl = 'http://localhost:4200/user/login';
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  user: User;

  constructor(
    private http: HttpClient,
    private _router: Router,
    private messageService: MessageService) { }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * loginUser - login user
   * @param user 
   */
  login(user: User) {
    return this.http.post<any>(this._loginUrl, user, { responseType: 'text' as 'json' })
      .pipe(
        tap(_ => this.log("login")),
        catchError(this.handleError(`login: ${user}`))
      );
  }

  /**
   * test - only for test
   */
  test() {
    return this.http.get<any>('http://localhost:4200/products')
      .pipe(
        tap(_ => this.log("test")),
        catchError(this.handleError(`test`))
      );
  }

  /**
   * loggedIn - check user login state
   */
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  /**
   * getToken - get token
   */
  getToken() {
    return localStorage.getItem('token');
  }

  /**
   * logout - user logout
   */
  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.user = {
      name: '',
      password: ''
    };
  }

  /**
   * isUserLoggedIn - is user loggedin?
   */
  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    return user === null ? false : true;
  }

  /**
   * getLoggedInUserName - get loggedin user name
   */
  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    return user === null ? '' : user;
  }

  /** Log a ProductService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }
}
