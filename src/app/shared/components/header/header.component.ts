import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  userProfile = this.authService.getUserProfile();

  constructor(
    private router: Router,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
