import { Component, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../../services/authentication.service'
import { NavigationService } from '../../services/navigation.service'
import { Subscription } from 'rxjs/internal/Subscription'
import { SnippetService } from '../../services/snippet.service'
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-navMobile',
  template: `
    <!-- Nav List for small screens -->
    <div class="z-10 text-2xl text-black sm:hidden">
      <ul class="p-4">
        <li class="py-2"><button (click)="goToHome()">Home</button></li>
        <li class="py-2"><button (click)="goToProfile()">Profile</button></li>
        <li class="py-2">
          <button *ngIf="userSnippets.length <= 4" (click)="goToSnippet()">
            Create Snippet
          </button>
        </li>
        <li class="py-6 text-red-600"><button (click)="logout()">Logout</button></li>
      </ul>
    </div>
  `
})
export class NavMobileComponent implements OnDestroy {
  navListVisible: boolean = false
  private navVisibilitySubscription: Subscription
  userSnippets: any[] = []
  userProfile: any
  private authSubscription?: Subscription

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private navService: NavigationService,
    private userService: UserService,
    public snippetService: SnippetService
  ) {
    this.navVisibilitySubscription = this.navService.navListVisible$.subscribe(
      (visible) => {
        this.navListVisible = visible
      }
    )
    this.authSubscription = this.userService.userProfile$.subscribe((profile) => {
      this.userProfile = profile
    })
    this.snippetService.getUserSnippets(this.userProfile._id).subscribe((snippets) => {
      this.userSnippets = snippets
    })
  }

  ngOnDestroy() {
    this.navVisibilitySubscription.unsubscribe()
  }

  goToHome() {
    this.router.navigate(['/'])
    this.navService.setNavListVisible(false)
  }

  goToProfile() {
    this.router.navigate(['profile'])
    this.navService.setNavListVisible(false)
  }

  goToSnippet() {
    this.router.navigate(['create'])
    this.navService.setNavListVisible(false)
  }

  goToCreateSnippet() {
    this.router.navigate(['snippet/create'])
    this.navService.setNavListVisible(false)
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/'])
    this.navService.setNavListVisible(false)
  }
}
