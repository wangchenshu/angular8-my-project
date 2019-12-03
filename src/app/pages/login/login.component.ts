import { Component, OnInit } from '@angular/core';
import { UserMaker, User } from '../../model/user'
import { AuthenticationService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { SessionStore } from 'src/app/store/store/session.store';

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
    private sessionStore: SessionStore,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  /**
   * login - user login
   */
  login(): void {
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
            this.sessionStore.update({ name: user.name, token: token });

            this.invalidLogin = false;
            this.loginSuccess = true;
            this.successMessage = 'Login Successful.';
            alert('login success');
            this.router.navigate(['/home']);
          }
        }, () => {
          this.invalidLogin = true;
          this.loginSuccess = false;
        });
  }
}
