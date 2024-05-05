import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnippetService } from 'src/app/shared/services/snippet.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']  // Note: Corrected from styleUrl to styleUrls
})
export class ProfileComponent implements OnInit, OnDestroy {
  userProfile: any;
  userSnippets: any[] = [];
  private authSubscription?: Subscription;
  private routeSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    public snippetService: SnippetService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      const userId = params['userId'];  // Assuming 'userId' is the route parameter key
      if (userId) {
        this.fetchUserProfileAndSnippets(userId);
      } else {
        console.error('No userId provided in the route parameters');
        this.router.navigate(['/']);  // Redirect to home or another appropriate route
      }
    });
  }

  fetchUserProfileAndSnippets(userId: string) {
    this.userService.getUserProfile(userId).subscribe({
      next: userProfile => {
        this.userProfile = userProfile;
        this.fetchUserSnippets(userId);  // Fetch snippets after user profile is confirmed
      },
      error: error => {
        console.error('Failed to fetch user profile:', error);
        this.router.navigate(['/']);
      }
    });
  }

  fetchUserSnippets(userId: string) {
    this.snippetService.getUserSnippets(userId).subscribe({
      next: snippets => {
        this.userSnippets = snippets;
        this.changeDetector.detectChanges();  // Ensure the UI updates with new data
      },
      error: error => {
        console.error('Failed to fetch snippets for user:', error);
      }
    });
  }

  deleteSnippet(snippetId: string) {
    this.snippetService.deleteSnippet(snippetId).subscribe({
      next: () => {
        this.userSnippets = this.userSnippets.filter(snippet => snippet._id !== snippetId);
        this.changeDetector.detectChanges();
      },
      error: (error) => console.error('Error deleting snippet', error)
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  goToCreateSnippet() {
    this.router.navigate(['create']);
  }
}
