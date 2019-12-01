import { Component, OnInit } from '@angular/core';
import { UserMaker, User } from '../../model/user'
import { AuthenticationService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  name: string;
  password: string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  /**
   * userLogin - user login
   */
  userLogin(): void {
    let user = UserMaker.create({
      name: this.name,
      password: this.password
    });

    this.authenticationService.login(user)
      .subscribe(
        res => {
          let token = res.split('<br>')[1].trim();

          if (res == undefined) {
            this.invalidLogin = true;
            this.loginSuccess = false;
          } else {
            localStorage.setItem('token', token);
            this.invalidLogin = false;
            this.loginSuccess = true;
            this.successMessage = 'Login Successful.';
            alert('login success');
          }
        }, () => {
          this.invalidLogin = true;
          this.loginSuccess = false;
        });
  }

  /**
   * test - only for test
   */
  test(): void {
    this.authenticationService.test()
      .subscribe(res => {
        console.log(res);
      })
  }
}
