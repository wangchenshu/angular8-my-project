import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) {
  }

  ngOnInit() {
  }

  /**
   * logout - logout
   */
  logout(): void {
    if (confirm('Continue Logout?')) {
      this.authenticationService.logout();
      this.router.navigate(['login']);
    }
  }
}
