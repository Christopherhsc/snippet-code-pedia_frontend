import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../../services/authentication.service'
import { Subscription } from 'rxjs/internal/Subscription'
import { UserService } from '../../services/user.service'
import { NavigationService } from '../../services/navigation.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private navVisibilitySubscription: Subscription = new Subscription()
  private authSubscription?: Subscription

  userProfile: any
  navListVisible = false
  isHovering: boolean = false

  constructor(
    private router: Router,
    public authService: AuthenticationService,
    public UserService: UserService,
    private navService: NavigationService
  ) {}

  ngOnInit() {
    this.authSubscription = this.UserService.userProfile$.subscribe((profile) => {
      this.userProfile = profile
    })
    this.navVisibilitySubscription = this.navService.navListVisible$.subscribe(
      (visible) => {
        this.navListVisible = visible
      }
    )
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe()
    }
    this.navVisibilitySubscription.unsubscribe()
  }

  goToHome() {
    this.router.navigate(['/'])
  }

  goToLogin() {
    this.router.navigate(['login'])
  }

  goToProfile() {
    this.router.navigate(['profile'])
  }

  goToSnippet() {
    this.router.navigate(['create'])
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/'])
  }

  onMouseEnter() {
    this.isHovering = true
  }

  onMouseLeave() {
    this.isHovering = false
  }

  toggleNavList() {
    this.navService.toggleNavListVisible()
  }
}
