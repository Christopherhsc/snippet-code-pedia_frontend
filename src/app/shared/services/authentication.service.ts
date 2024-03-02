import { Injectable } from '@angular/core'
import { UserService } from './user.service'
import { Observable, catchError, tap, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isAuthenticated = false

  constructor(private userService: UserService) {
    this.checkAuthentication()
  }

  createUser(userInfo: any): Observable<any> {
    const userData = {
      email: userInfo.email,
      username: userInfo.name,
      imageUrl: userInfo.picture,
      ...(userInfo.password && { password: userInfo.password }),
      registrationMethod: userInfo.registrationMethod
    }

    return this.userService.saveUserData(userData).pipe(
      tap((response) => {
        // Set item in sessionStorage and update authentication status only after successful response
        sessionStorage.setItem('loggedInUser', JSON.stringify(response))
        this.isAuthenticated = true
        this.userService.updateUserProfile(response)
      }),
      catchError((error) => {
        console.error('Error in createUser:', error)
        return throwError(() => new Error(error))
      })
    )
  }

  register(userData: any): Observable<any> {
    return this.userService.saveUserData(userData)
  }

  loginSCP(email: string, password: string): Observable<any> {
    return this.userService.loginUser(email, password).pipe(
      tap((response) => {
        // Handle successful login
        sessionStorage.setItem('loggedInUser', JSON.stringify(response))
        this.isAuthenticated = true
        this.userService.updateUserProfile(response.user)
        console.log('response', response)
      }),
      catchError((error) => {
        console.error('Error in SCP login:', error)
        return throwError(() => new Error(error))
      })
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
