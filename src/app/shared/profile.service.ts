import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  loggedInUser: any;

  constructor() { }
  login(user: any) {
    this.loggedInUser = user;
  }
  logout() {
    this.loggedInUser = null;
  }
}
