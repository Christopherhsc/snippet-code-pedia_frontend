// authenticated.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    if (this.authService.isLoggedIn()) {
      return of(true); // Allow access if the user is authenticated
    }
    return of(this.router.createUrlTree(['/login'])); // Redirect to login if not authenticated
  }
}