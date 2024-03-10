import { Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { UserService } from '../services/user.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userService.getUserProfile().pipe(
      map((userProfile) => {
        if (userProfile) {
          // If there's a user profile, the user is authenticated
          return true
        } else {
          // If there's no user profile, redirect to the login page
          return this.router.createUrlTree(['/login'])
        }
      })
    )
  }
}
