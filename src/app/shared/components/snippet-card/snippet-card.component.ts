import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-snippet-card',
  templateUrl: './snippet-card.component.html',
  styleUrls: ['./snippet-card.component.scss']
})
export class SnippetCardComponent implements OnInit, OnChanges {
  @Input() snippets: any[] = [];
  @Input() showDeleteSnippet: boolean = false;
  @Output() deleteSnippet = new EventEmitter<string>();

  balancedColumns: any[][] = [[], []];
  visibleDivs = 2;
  userProfile: any;

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
          this.visibleDivs = 2;
        } else if (result.breakpoints[Breakpoints.Large]) {
          this.visibleDivs = 2;
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.visibleDivs = 2;
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.visibleDivs = 1;
        }
      });

    this.balanceSnippets();
  }

  ngOnChanges() {
    this.balanceSnippets();
  }

  balanceSnippets() {
    this.balancedColumns = [[], []];
    const columnHeights = [0, 0];

    // Estimate heights for each snippet
    const snippetHeights = this.snippets.map((snippet) => this.estimateSnippetHeight(snippet));

    // Balance logic: distribute snippets based on their heights
    this.snippets.forEach((snippet, index) => {
      const shortestColumn = columnHeights[0] <= columnHeights[1] ? 0 : 1;
      this.balancedColumns[shortestColumn].push(snippet);
      columnHeights[shortestColumn] += snippetHeights[index];
    });

    // Ensure both columns have at least one snippet
    if (this.balancedColumns[0].length === 0 && this.balancedColumns[1].length > 0) {
      this.balancedColumns[0] = this.balancedColumns[1].splice(0, Math.ceil(this.balancedColumns[1].length / 2));
    } else if (this.balancedColumns[1].length === 0 && this.balancedColumns[0].length > 0) {
      this.balancedColumns[1] = this.balancedColumns[0].splice(0, Math.ceil(this.balancedColumns[0].length / 2));
    }
  }

  estimateSnippetHeight(snippet: any): number {
    // Base height for the card structure
    let baseHeight = 100;

    // Add the image height if available
    if (snippet.pictureHeight) {
      baseHeight += snippet.pictureHeight;
    } else if (snippet.picture) {
      // Fallback estimation
      baseHeight += this.estimateImageHeight(snippet.picture);
    }

    // Add a buffer for the description, tags, etc.
    baseHeight += (snippet.description ? 50 : 10); // Approximate 50px for description
    baseHeight += (snippet.tags ? 30 : 10); // Approximate 30px for tags

    return baseHeight;
  }

  estimateImageHeight(picture: any): number {
    const aspectRatio = picture.width && picture.height ? picture.height / picture.width : 1;
    const cardWidth = 300; // Approximate card width
    return cardWidth * aspectRatio;
  }

  onDeleteSnippet(snippetId: string) {
    this.deleteSnippet.emit(snippetId);
  }
}
