import { Injectable } from '@angular/core'
import { UserService } from './user.service'
import { Observable, catchError, tap, throwError } from 'rxjs'
import { CustomToastrService } from './custom-toastr.service'
import { DataService } from './data.service'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isAuthenticated = false

  constructor(
    private userService: UserService,
    private customToaster: CustomToastrService,
    private dataService: DataService
  ) {
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

    return this.dataService.saveUserData(userData).pipe(
      tap((response) => {
        // Set item in sessionStorage and update authentication status only after successful response
        sessionStorage.setItem('loggedInUser', JSON.stringify(response))
        this.isAuthenticated = true
        this.userService.updateUserProfile(response)
      }),
      catchError((error) => {
        let errorMessage = 'An error occurred'

        // Check if the error response has a message
        if (error.error && error.error.message) {
          errorMessage = error.error.message
        }

        this.customToaster.error(errorMessage, 'Registration Error')

        console.error('Error in createUser:', error)

        // Re-throw the error as an Observable
        return throwError(() => new Error(errorMessage))
      })
    )
  }

  register(userData: any): Observable<any> {
    return this.dataService.saveUserData(userData)
  }

  loginSCP(email: string, password: string): Observable<any> {
    return this.dataService.loginUser(email, password).pipe(
      tap((response) => {
        sessionStorage.setItem('loggedInUser', JSON.stringify(response))
        this.isAuthenticated = true
        this.userService.updateUserProfile(response)
      }),
      catchError((error) => {
        return throwError(() => new Error(error))
      })
    )
  }

  private checkAuthentication() {
    const user = sessionStorage.getItem('loggedInUser')
    if (user) {
      try {
        const userData = JSON.parse(user)
        delete userData?.password
        this.userService.updateUserProfile(userData)
        this.isAuthenticated = true
      } catch (e) {
        console.error('Failed to parse user data:', e)
        this.isAuthenticated = false
      }
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
