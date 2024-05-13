import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { noop } from 'rxjs'
import { StatisticService } from 'src/app/shared/services/statistic.service'
import { UserService } from 'src/app/shared/services/user.service'
import { SnippetService } from 'src/app/shared/services/snippet.service'
import { AuthenticationService } from 'src/app/shared/services/authentication.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userProfile: any
  userSnippets: any[] = []
  private authSubscription?: Subscription
  private routeSub?: Subscription
  isOwnProfile: boolean = false

  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    private authService: AuthenticationService,
    public snippetService: SnippetService,
    private statisticService: StatisticService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      const userId = params['userId']
      if (userId) {
        this.trackAndLoadUserProfile(userId)
      } else {
        console.error('No userId provided in the route parameters')
        this.router.navigate(['/'])
      }
    })
  }

  /**
   * Track profile visit and load profile details
   * @param userId
   */
  trackAndLoadUserProfile(userId: string) {
    this.statisticService.trackProfileVisit(userId).subscribe({
      next: () => {
        this.fetchUserProfileAndSnippets(userId)
      },
      error: (error) => {
        console.error('Failed to track profile visit:', error)
        this.fetchUserProfileAndSnippets(userId)
      }
    })
  }

  fetchUserProfileAndSnippets(userId: string) {
    this.userService.getUserProfile(userId).subscribe({
      next: userProfile => {
        this.userProfile = userProfile;
        this.isOwnProfile = userId === this.authService.getCurrentUserId();
        this.fetchUserSnippets(userId);
      },
      error: error => {
        console.error('Failed to fetch user profile:', error);
        this.router.navigate(['/']);
      }
    });
  }
  

  fetchUserSnippets(userId: string) {
    this.snippetService.getUserSnippets(userId).subscribe({
      next: (snippets) => {
        this.userSnippets = snippets
        this.changeDetector.detectChanges()
      },
      error: (error) => {
        console.error('Failed to fetch snippets for user:', error)
      }
    })
  }

  getTotalVisitors(): number {
    if (this.userProfile?.visitors) {
      return this.userProfile.visitors.length
    }
    return 0
  }

  deleteSnippet(snippetId: string) {
    this.snippetService.deleteSnippet(snippetId).subscribe({
      next: () => {
        this.userSnippets = this.userSnippets.filter(
          (snippet) => snippet._id !== snippetId
        )
        this.changeDetector.detectChanges()
      },
      error: (error) => console.error('Error deleting snippet', error)
    })
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe()
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe()
    }
  }

  goToCreateSnippet() {
    this.router.navigate(['create'])
  }
}
