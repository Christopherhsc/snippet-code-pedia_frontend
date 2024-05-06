import { ChangeDetectorRef, Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchTerm = '';
  searchResults: any = { snippets: [], users: [] };
  searchTerms = new Subject<string>();
  buttonFocused: boolean = false;

  constructor(
    public auth: AuthenticationService,
    private searchService: SearchService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private elRef: ElementRef  // Inject ElementRef
  ) {
    this.searchTerms.pipe(debounceTime(500)).subscribe((term) => {
      if (term.length >= 3 && this.auth.isLoggedIn()) {
        this.searchService.search(term).subscribe({
          next: (results) => {
            this.searchResults = results;
          },
          error: (error) => console.error('Search error:', error)
        });
      }
    });
  }

  onSearchInput(): void {
    const processedSearchTerm = this.searchTerm.replace(/[#]+/g, '');
    if (processedSearchTerm.length > 2) {
      this.searchTerms.next(processedSearchTerm);
    }
  }

  onInputFocus(): void {
    this.buttonFocused = true;
  }

  routeToUserProfile(userId: string): void {
    this.router.navigate(['/profile', userId]);
  }

  routeToSnippetOverview(snippetId: string): void {
    this.router.navigate(['', snippetId]);
  }
}
