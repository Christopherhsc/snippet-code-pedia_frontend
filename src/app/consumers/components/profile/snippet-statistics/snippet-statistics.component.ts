import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate,
  state
} from '@angular/animations'
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core'
import { Subscription } from 'rxjs'
import { SnippetService } from 'src/app/shared/services/snippet.service'
import { StatisticService } from 'src/app/shared/services/statistic.service'

@Component({
  selector: 'app-snippet-statistics',
  templateUrl: './snippet-statistics.component.html',
  styleUrls: ['./snippet-statistics.component.scss'],
  animations: [
    trigger('fade', [
      transition('* => *', [
        query('.dashboard-overview', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(500, [
            animate('1000ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class SnippetStatisticsComponent implements OnInit, OnDestroy {
  @Input() userId?: any
  @Input() snippets: any[] = []
  @Input() userRole: number = 1
  @Input() isOwnProfile: boolean = false

  activatedDashboardOverview: number = 1
  totalVisitors: number = 0

  maxSnippets: number = Infinity
  private subscriptions = new Subscription()
Infinity: any

  constructor(
    private snippetService: SnippetService,
    private statisticService: StatisticService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.fetchSnippets()
    this.trackProfileVisit()

    this.updateMaxSnippets()
  }

  changeActiveDashboard(index: number): void {
    this.activatedDashboardOverview = index
    this.cdr.detectChanges()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userRole']) {
      this.updateMaxSnippets()
    }
  }

  trackProfileVisit(): void {
    if (this.userId) {
      this.statisticService.trackProfileVisit(this.userId).subscribe({
        next: (response) => {
          if (response && typeof response.totalVisitors === 'number') {
            this.totalVisitors = response.totalVisitors
          } else if (response && response.newVisitorsCount) {
            this.totalVisitors = response.newVisitorsCount
          }
        },
        error: (error) => console.error('Error tracking visit:', error)
      })
    }
  }

  onSnippetsUpdated(count: number) {
    this.snippets.length = count
  }

  fetchSnippets() {
    if (this.userId) {

    }
  }

  handleSnippets(snippetCount: number): void {
    this.snippets.length = snippetCount;
    this.cdr.detectChanges();  // Ensure UI updates if necessary
  }

  updateMaxSnippets() {
    this.maxSnippets = this.snippetService.getMaxSnippets(this.userRole)
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
