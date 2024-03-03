import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../../services/authentication.service'
import { Subscription } from 'rxjs'
import { UserService } from '../../services/user.service'
import { NavigationService } from '../../services/navigation.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  userProfile: any
  private authSubscription?: Subscription
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
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe()
    }
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

  logout() {
    this.authService.logout()
    this.router.navigate(['/'])
  }
}
