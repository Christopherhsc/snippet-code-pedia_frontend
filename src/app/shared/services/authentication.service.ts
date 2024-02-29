import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from './user.service'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isAuthenticated = false

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.checkAuthentication()
  }

  createUser(userInfo: any): Observable<any> {
    const userData = {
      email: userInfo.email,
      username: userInfo.name,
      imageUrl: userInfo.picture,
      ...(userInfo.password && { password: userInfo.password })
    };

    sessionStorage.setItem('loggedInUser', JSON.stringify(userData));
    this.isAuthenticated = true;
    this.router.navigate(['/']);
    this.userService.updateUserProfile(userData);
    return this.userService.saveUserData(userData);
  }

  register(userData: any): void {
    this.userService.saveUserData(userData).subscribe(
      (response: string) => {
        console.log('Registration successful', response)
        this.createUser(response) // If you want to log in the user upon registration
      },
      (error: string) => {
        console.error('Error during registration', error)
      }
    )
  }

  private checkAuthentication() {
    const user = sessionStorage.getItem('loggedInUser')
    if (user) {
      this.isAuthenticated = true
      const userData = JSON.parse(user)
      this.userService.updateUserProfile(userData)
    }
  }

  logout() {
    sessionStorage.removeItem('loggedInUser')
    this.isAuthenticated = false
    this.userService.clearUserProfile()
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated
  }
}
