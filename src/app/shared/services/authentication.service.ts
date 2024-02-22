declare var google: any

import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isAuthenticated = false
  private userProfileSubject = new BehaviorSubject<any>(null)
  public userProfile$ = this.userProfileSubject.asObservable()

  constructor(private router: Router) {
    this.checkAuthentication()
  }

  login(userData: any) {
    this.userProfileSubject.next(userData)
    sessionStorage.setItem('loggedInUser', JSON.stringify(userData))
    this.isAuthenticated = true
  }

  getUserProfile(): any {
    const user = sessionStorage.getItem('loggedInUser')
    if (user) {
      const userData = JSON.parse(user)
      console.log('Retrieved user from storage:', userData)
      return userData
    }
    return {}
  }

  private checkAuthentication() {
    const user = sessionStorage.getItem('loggedInUser')
    if (user) {
      const userData = JSON.parse(user)
      console.log('Retrieved user from storage:', userData)
      this.userProfileSubject.next(userData)
      this.isAuthenticated = true
    }
  }

  logout() {
    sessionStorage.removeItem('loggedInUser')
    this.isAuthenticated = false
    this.userProfileSubject.next(null)
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated
  }
}
