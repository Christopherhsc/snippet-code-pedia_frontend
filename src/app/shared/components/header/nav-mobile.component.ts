import { Component, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../../services/authentication.service'
import { NavigationService } from '../../services/navigation.service'
import { Subscription } from 'rxjs/internal/Subscription'

@Component({
  selector: 'app-navMobile',
  template: `
    <!-- Nav List for small screens -->
    <div class="z-10 text-2xl text-black sm:hidden">
      <ul class="p-4">
        <li class="py-2"><button (click)="home()">Home</button></li>
        <li class="py-2"><a routerLink="/profile">Profile</a></li>
        <li class="py-2">
          <button (click)="goToSnippet()">Create Snippet</button>
        </li>
        <li class="py-6 text-red-600"><button (click)="logout()">Log Out</button></li>
      </ul>
    </div>
  `
})
export class NavMobileComponent implements OnDestroy {
  navListVisible: boolean = false
  private navVisibilitySubscription: Subscription

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private navService: NavigationService
  ) {
    this.navVisibilitySubscription = this.navService.navListVisible$.subscribe(
      (visible) => {
        this.navListVisible = visible
      }
    )
  }

  ngOnDestroy() {
    this.navVisibilitySubscription.unsubscribe()
  }

  home() {
    this.router.navigate(['/'])
    this.navService.setNavListVisible(false)
  }

  goToSnippet() {
    this.router.navigate(['/snippet'])
    this.navService.setNavListVisible(false)
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/'])
    this.navService.setNavListVisible(false)
  }
}
