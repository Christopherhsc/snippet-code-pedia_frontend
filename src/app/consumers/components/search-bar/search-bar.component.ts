import { Component } from '@angular/core'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { AuthenticationService } from 'src/app/shared/services/authentication.service'
import { SearchService } from 'src/app/shared/services/search.service'

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchTerm: string = ''
  searchTerms = new Subject<string>()
  buttonFocused: boolean = false

  constructor(
    public auth: AuthenticationService,
    private searchService: SearchService
  ) {
    this.searchTerms.pipe(debounceTime(500)).subscribe((term) => {
      if (term.length >= 3 && this.auth.isLoggedIn()) {
        this.searchService.search(term).subscribe({
          next: (results) => {
            console.log('Search results:', results)
            // Handle the search results
          },
          error: (error) => {
            console.error('Search error:', error)
          }
        })
      }
    })
  }

  onSearchInput(): void {
    this.searchTerms.next(this.searchTerm)
  }

  onInputFocus(): void {
    this.buttonFocused = true
  }

  onInputBlur(): void {
    this.buttonFocused = false
  }

  performSearch(term: string): void {
    if (term.length >= 3 && this.auth.isLoggedIn()) {
      console.log('Searching for:', term)
      // Implement your search logic here
    }
  }
}
