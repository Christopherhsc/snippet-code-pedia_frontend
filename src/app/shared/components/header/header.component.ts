import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../../services/authentication.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  userProfile: any
  private authSubscription?: Subscription

  constructor(
    private router: Router,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authSubscription = this.authService.userProfile$.subscribe((profile) => {
      this.userProfile = profile
    })
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe()
    }
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/'])
  }
}
