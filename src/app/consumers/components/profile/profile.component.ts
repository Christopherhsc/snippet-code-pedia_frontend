import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthenticationService } from 'src/app/shared/services/authentication.service'
import { UserService } from 'src/app/shared/services/user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userProfile: any
  private authSubscription?: Subscription

  constructor(
    public authService: AuthenticationService,
    public UserService: UserService,
    private router: Router
  ) {}

  goToCreateSnippet() {
    this.router.navigate(['snippet/create'])
  }

  ngOnInit() {
    this.authSubscription = this.UserService.userProfile$.subscribe((profile) => {
      this.userProfile = profile
    })
  }
}
