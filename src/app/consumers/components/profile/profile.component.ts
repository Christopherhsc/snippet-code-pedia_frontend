import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { UserService } from 'src/app/shared/services/user.service'
import { SnippetService } from 'src/app/shared/services/snippet.service'
import { AuthenticationService } from 'src/app/shared/services/authentication.service'
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { StatisticService } from 'src/app/shared/services/statistic.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userProfile: any
  userSnippets: any[] = []
  loadingSnippets: boolean = true
  isOwnProfile: boolean = false
  userRole: number = 1
  private destroy$ = new Subject<void>()
  private snippetSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthenticationService,
    private snippetService: SnippetService,
    private router: Router,
    private statisticService: StatisticService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const userId = params['userId'];
      if (userId) {
        this.statisticService.trackProfileVisit(userId).subscribe({
          next: () => {
            this.loadUserProfileAndSnippets(userId); // Existing method to load user profile
            this.fetchUserSnippets(userId); // Additional method to fetch user snippets
          },
          error: (error) => {
            console.error('Failed to track profile visit:', error);
            this.loadUserProfileAndSnippets(userId); // Fallback to load profile if tracking fails
            this.fetchUserSnippets(userId); // Fallback to load snippets if tracking fails
          }
        });
      } else {
        console.error('No userId provided in the route parameters');
        this.router.navigate(['/']);
      }
    });
  }
  
  private fetchUserSnippets(userId: string): void {
    this.snippetService.getUserSnippets(userId).subscribe({
      next: snippets => {
        this.userSnippets = snippets;
      },
      error: error => {
        console.error('Failed to fetch snippets for user:', error);
      }
    });
  }

  loadUserProfileAndSnippets(userId: string): void {
    this.userService
      .getUserProfile(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (userProfile) => {
          this.userProfile = userProfile
          this.userRole = userProfile.role
          this.isOwnProfile = userId === this.authService.getCurrentUserId()
          this.loadUserSnippets(userId)
        },
        error: (error) => {
          console.error('Failed to fetch user profile:', error)
          this.loadingSnippets = false
          this.router.navigate(['/'])
        }
      })
  }

  loadUserSnippets(userId: string): void {
    this.snippetService
      .getUserSnippets(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (snippets) => {
          this.userSnippets = snippets
          this.loadingSnippets = false
        },
        error: (error) => {
          console.error('Failed to fetch snippets for user:', error)
          this.loadingSnippets = false
        }
      })
  }

  deleteSnippet(snippetId: string): void {
    this.snippetService
      .deleteSnippet(snippetId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.userSnippets = this.userSnippets.filter(
            (snippet) => snippet._id !== snippetId
          )
        },
        error: (error) => console.error('Error deleting snippet', error)
      })
  }

  canCreateSnippet(): boolean {
    const maxSnippets = this.getMaxSnippets(this.userRole)
    return this.userSnippets.length < maxSnippets
  }

  getMaxSnippets(role: number): number {
    switch (role) {
      case 1:
        return 5
      case 2:
        return 15
      default:
        return Infinity
    }
  }

  getTotalVisitors(): number {
    if (this.userProfile?.visitors) {
      return this.userProfile.visitors.length
    }
    return 0
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
