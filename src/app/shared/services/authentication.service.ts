import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isAuthenticated = false;

  constructor(private router: Router, private userService: UserService) {
    this.checkAuthentication();
  }

  login(userData: any) {
    sessionStorage.setItem('loggedInUser', JSON.stringify(userData));
    this.isAuthenticated = true;
    this.userService.updateUserProfile(userData);
  }

  private checkAuthentication() {
    const user = sessionStorage.getItem('loggedInUser');
    if (user) {
      const userData = JSON.parse(user);
      this.isAuthenticated = true;
      this.userService.updateUserProfile(userData);
    }
  }

  logout() {
    sessionStorage.removeItem('loggedInUser');
    this.isAuthenticated = false;
    this.userService.clearUserProfile();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
