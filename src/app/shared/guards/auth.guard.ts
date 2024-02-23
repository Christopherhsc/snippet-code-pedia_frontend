// auth.guard.ts

import { Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
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
    return this.userService.userProfile$.pipe(
      map((user) => {
        if (user) {
          return true
        } else {
          return this.router.createUrlTree(['/login'])
        }
      })
    )
  }
}
