import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthenticationService } from './shared/services/authentication.service'
import { NavigationService } from './shared/services/navigation.service'
import { trigger, state, style, transition, animate } from '@angular/animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate('500ms ease-in')]),
      transition(':leave', animate('500ms ease-out', style({ opacity: 0 })))
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'SourceStyleHub'
  private navVisibilitySubscription: Subscription = new Subscription()
  isTransitioning: boolean = false
  showHomeComponent = true
  showNavCompent = false

  constructor(
    public auth: AuthenticationService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.navVisibilitySubscription = this.navigationService.navListVisible$.subscribe(
      (visible) => {
        this.setNavListVisible(visible)
      }
    )
  }

  setNavListVisible(visible: boolean) {
    if (this.isTransitioning) return
    this.isTransitioning = true

    if (visible) {
      this.showHomeComponent = false
      setTimeout(() => {
        this.showNavCompent = true
        this.isTransitioning = false
      }, 600)
    } else {
      this.showNavCompent = false
      setTimeout(() => {
        this.showHomeComponent = true
        this.isTransitioning = false
      }, 600)
    }
  }

  ngOnDestroy() {
    this.navVisibilitySubscription.unsubscribe()
  }
}
