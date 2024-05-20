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
  @Input() userProfile: any
  @Input() isOwnProfile: boolean = false
  @Input() snippets: any[] = [];  // Ensure snippets is always an array
  @Output() snippetsUpdated = new EventEmitter<number>()

  loadingSnippets: boolean = true
  private destroy$ = new Subject<void>()

  constructor(private snippetService: SnippetService) {}

  ngOnInit(): void {
    this.loadingSnippets = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['snippets'] && changes['snippets'].currentValue) {
      this.snippetsUpdated.emit(this.snippets.length);
    }
  }

  deleteSnippet(snippetId: string): void {
    this.snippetService.deleteSnippet(snippetId).subscribe({
      next: () => {
        this.snippets = this.snippets.filter(
          (snippet) => snippet._id !== snippetId
        )
        this.snippetsUpdated.emit(this.snippets.length)
      },
      error: (error) => console.error('Error deleting snippet', error)
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
