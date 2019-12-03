import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: User[];

  constructor(
    private userService: UserService,
    private _location: Location
  ) { }

  ngOnInit() {
  }

  /**
   * getUsers - get all users
   */
  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

  /**
   * clearUsers - clear users
   */
  clearUsers(): void {
    this.users = [];
  }

  /**
   * goBack - go back
   */
  goBack(): void {
    this._location.back();
  }

}
