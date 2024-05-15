import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { NavigationService } from '../../services/navigation.service';
import { SnippetService } from '../../services/snippet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  userSnippets: any[] = [];
  userProfile: any;
  navListVisible: boolean = false;
  isHomePage: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    private navService: NavigationService,
    private snippetService: SnippetService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.checkIfHomePage();
      })
    );

    this.subscriptions.add(
      this.userService.userProfile$.subscribe(profile => {
        this.userProfile = profile;
        if (profile && profile._id) {
          this.loadUserSnippets(profile._id);
        }
      })
    );

    this.subscriptions.add(
      this.navService.navListVisible$.subscribe(visible => {
        this.navListVisible = visible;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private checkIfHomePage(): void {
    // Match against the router URL and check for a root path
    this.isHomePage = this.router.url === '/' || this.router.url.startsWith('/home');
  }

  private loadUserSnippets(userId: string): void {
    this.snippetService.getUserSnippets(userId).subscribe(snippets => {
      this.userSnippets = snippets;
    });
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }

  goToProfile(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.router.navigate(['/profile', userId]);
    } else {
      console.error('User ID is not available');
    }
  }

  goToFilterModal() {
    this.router.navigate([{ outlets: { modal: ['filter'] } }]);
  }

  canCreateSnippet(): boolean {
    if (!this.userProfile) return false; // Ensure there is a user profile
    const maxSnippets = this.getMaxSnippets();
    return this.userSnippets.length < maxSnippets;
  }
  
  getMaxSnippets(): number {
    if (!this.userProfile) return 5; // Default limit
    switch (this.userProfile.role) {
      case 1: return 5;
      case 2: return 15;
      default: return Infinity; // Admin or roles that can create unlimited snippets
    }
  }

  goToSnippet(): void {
    this.router.navigate([{ outlets: { modal: ['create'] } }]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleNavList(): void {
    this.navService.toggleNavListVisible();
  }
}
