// unauthenticated.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthenticatedGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    if (this.authService.isLoggedIn()) {
      return of(this.router.createUrlTree(['/'])); // Redirect to home if authenticated
    }
    return of(true); // Allow access if the user is not authenticated
  }
}
