import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  Output
} from '@angular/core'
import { Subject, takeUntil } from 'rxjs'
import { SnippetService } from 'src/app/shared/services/snippet.service'

@Component({
  selector: 'app-total-snippets',
  templateUrl: './total-snippets.component.html',
  styleUrls: ['./total-snippets.component.scss']
})
export class TotalSnippetsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() userProfile: any;
  @Input() isOwnProfile: boolean = false;
  @Output() snippetsUpdated = new EventEmitter<number>();

  loadingSnippets: boolean = true;
  userSnippets: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(private snippetService: SnippetService) {}

  ngOnInit(): void {
    console.log('Component initialized');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userProfile'] && changes['userProfile'].currentValue) {
      this.loadUserSnippets();
    }
  }

  loadUserSnippets(): void {
    const userId = this.userProfile?._id;
    if (!userId) {
      console.error('No userId provided for loading snippets');
      return;
    }

    this.snippetService.getUserSnippets(userId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (snippets) => {
        this.userSnippets = snippets;
        this.loadingSnippets = false;
        this.snippetsUpdated.emit(this.userSnippets.length);
      },
      error: (error) => {
        console.error('Failed to fetch snippets for user:', error);
        this.loadingSnippets = false;
      }
    });
  }

  deleteSnippet(snippetId: string): void {
    this.snippetService.deleteSnippet(snippetId).subscribe({
      next: () => {
        this.userSnippets = this.userSnippets.filter(
          (snippet) => snippet._id !== snippetId
        );
        this.snippetsUpdated.emit(this.userSnippets.length);
      },
      error: (error) => console.error('Error deleting snippet', error)
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
