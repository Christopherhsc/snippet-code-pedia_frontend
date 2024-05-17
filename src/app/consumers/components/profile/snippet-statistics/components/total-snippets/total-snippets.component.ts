import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'
import { AuthenticationService } from 'src/app/shared/services/authentication.service'
import { SnippetService } from 'src/app/shared/services/snippet.service'
import { StatisticService } from 'src/app/shared/services/statistic.service'
import { UserService } from 'src/app/shared/services/user.service'

@Component({
  selector: 'app-total-snippets',
  templateUrl: './total-snippets.component.html',
  styleUrl: './total-snippets.component.scss'
})
export class TotalSnippetsComponent implements OnInit {
  @Input() userId?: string | null | undefined
  @Output() snippetsUpdated = new EventEmitter<number>()

  userProfile: any
  @Input() userRole: number = 1

  loadingSnippets: boolean = true
  userSnippets: any[] = []
  @Input() isOwnProfile: boolean = false
  private destroy$ = new Subject<void>()

  constructor(
    private snippetService: SnippetService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const userId = params['userId']
      if (userId) {
        this.userId = userId

        this.loadUserProfileAndSnippets(userId)
      } else {
        console.error('No userId provided in the route parameters')
        this.router.navigate(['/'])
      }
    })

    // Subscribe to the snippet creation observable
    this.snippetService.snippetCreated$
      .pipe(takeUntil(this.destroy$))
      .subscribe((snippet) => {
        if (snippet) {
          const userId = this.route.snapshot.params['userId']
          if (userId) {
            this.loadUserSnippets(userId)
          }
        }
      })
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
    this.snippetService.getUserSnippets(userId).subscribe({
      next: (snippets) => {
        this.userSnippets = snippets
        this.loadingSnippets = false
        this.snippetsUpdated.emit(this.userSnippets.length)
      },
      error: (error) => {
        console.error('Failed to fetch snippets for user:', error)
        this.loadingSnippets = false
      }
    })
  }

  deleteSnippet(snippetId: string): void {
    this.snippetService.deleteSnippet(snippetId).subscribe({
      next: () => {
        this.userSnippets = this.userSnippets.filter(
          (snippet) => snippet._id !== snippetId
        )
        this.snippetsUpdated.emit(this.userSnippets.length)
      },
      error: (error) => console.error('Error deleting snippet', error)
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
