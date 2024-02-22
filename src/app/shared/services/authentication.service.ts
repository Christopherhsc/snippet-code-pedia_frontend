declare var google: any;

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isAuthenticated = false;
  private userProfile: any;

  constructor(private router: Router) {
    this.checkAuthentication();
  }

  login(userData: any) {
    this.userProfile = userData;
    sessionStorage.setItem('loggedInUser', JSON.stringify(userData));
    this.isAuthenticated = true;
  }

  getUserProfile(): any {
    const user = sessionStorage.getItem('loggedInUser');
    if (user) {
      const userData = JSON.parse(user);
      console.log('Retrieved user from storage:', userData);
      return userData;
    }
    return {};
  }

  private checkAuthentication() {
    const user = sessionStorage.getItem('loggedInUser');
    if (user) {
      this.userProfile = JSON.parse(user);
      this.isAuthenticated = true;
    }
  }

  logout() {
    sessionStorage.removeItem('loggedInUser');
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
