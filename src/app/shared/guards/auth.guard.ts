import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      // If no user ID is found, immediately navigate to login
      return of(this.router.createUrlTree(['/login']));
    }

    // If user ID exists, proceed to check user profile
    return this.userService.getUserProfile(userId).pipe(
      map(userProfile => {
        if (userProfile && this.authService.isLoggedIn()) {
          // User is authenticated
          return true;
        } else {
          // Redirect to login if either check fails
          return this.router.createUrlTree(['/login']);
        }
      }),
      catchError(() => {
        // Handle any errors, e.g., if the userProfile request fails
        return of(this.router.createUrlTree(['/login']));
      })
    );
  }
}
