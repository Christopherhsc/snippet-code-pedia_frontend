import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UserService } from 'src/app/shared/services/user.service'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-snippet-card',
  templateUrl: './snippet-card.component.html',
  styleUrls: ['./snippet-card.component.scss']
})
export class SnippetCardComponent implements OnInit {
  @Input() snippets: any[] = []
  @Input() showDeleteSnippet: boolean = false
  @Output() deleteSnippet = new EventEmitter<string>()

  visibleDivs = 4
  userProfile: any

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.userService.getUserProfile(userId).subscribe((profile) => {
        this.userProfile = profile;
      });
    }

    this.breakpointObserver
      .observe([
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
      ])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.visibleDivs = 4;
        } else if (result.breakpoints[Breakpoints.Large]) {
          this.visibleDivs = 3;
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.visibleDivs = 2;
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.visibleDivs = 1;
        }
      });
  }

  isCardVisible(divIndex: number, cardIndex: number): boolean {
    // Adjust the modulo based on the number of visible divs
    return cardIndex % this.visibleDivs === divIndex
  }

  onDeleteSnippet(snippetId: string) {
    this.deleteSnippet.emit(snippetId)
  }
}
