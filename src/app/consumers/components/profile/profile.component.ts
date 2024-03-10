import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { AuthenticationService } from 'src/app/shared/services/authentication.service'
import { SnippetService } from 'src/app/shared/services/snippet.service'
import { UserService } from 'src/app/shared/services/user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  userProfile: any

  private authSubscription?: Subscription

  userSnippets: any[] = []

  constructor(
    public userService: UserService,
    public snippetService: SnippetService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authSubscription = this.userService.userProfile$.subscribe((userProfile) => {
      this.userProfile = userProfile
      if (userProfile) {
        this.snippetService.getUserSnippets(userProfile._id).subscribe((snippets) => {
          this.userSnippets = snippets
        })
      }
    })
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe()
    }
  }

  goToCreateSnippet() {
    this.router.navigate(['create'])
  }
}
