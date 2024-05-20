import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { SnippetService } from 'src/app/shared/services/snippet.service';
import { StatisticService } from 'src/app/shared/services/statistic.service';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { takeUntil } from 'rxjs/operators';
import { DASHBOARD_OVERVIEWS, DashboardOverview } from './dashboard-data';

@Component({
  selector: 'app-snippet-statistics',
  templateUrl: './snippet-statistics.component.html',
  styleUrls: ['./snippet-statistics.component.scss'],
  animations: [
    trigger('fade', [
      transition('* => *', [
        query(
          '.dashboard-overview',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(500, [
              animate(
                '1000ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              )
            ])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class SnippetStatisticsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() userProfile: any;
  @Input() isOwnProfile: boolean = false;

  activatedDashboardOverview: number = 1;
  totalVisitors: number = 0;
  maxSnippets: number = Infinity;
  snippets: any[] = [];
  private destroy$ = new Subject<void>();
  dashboardOverviews: DashboardOverview[] = DASHBOARD_OVERVIEWS;
Infinity: any;

  constructor(
    private snippetService: SnippetService,
    private statisticService: StatisticService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.updateMaxSnippets();
    this.subscribeToSnippetCreation();
    this.fetchSnippets();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userProfile'] && changes['userProfile'].currentValue) {
      this.fetchSnippets();
      this.updateTotalVisitors();  // Update the total visitors from userProfile
      this.trackProfileVisit();
      console.log(this.userProfile);
    }
  }

  changeActiveDashboard(index: number): void {
    this.activatedDashboardOverview = index;
    this.updateDashboardValues(); // Update dashboard values when changing active dashboard
    this.cdr.detectChanges();
  }

  trackProfileVisit(): void {
    if (this.userProfile?._id) {
      this.statisticService.trackProfileVisit(this.userProfile._id).subscribe({
        next: (response) => {
          if (response && typeof response.totalVisitors === 'number') {
            this.totalVisitors = response.totalVisitors;
          } else if (response && response.newVisitorsCount) {
            this.totalVisitors = response.newVisitorsCount;
          }
          this.updateDashboardValues(); // Ensure the dashboard is updated after tracking visit
        },
        error: (error) => console.error('Error tracking visit:', error)
      });
    }
  }

  fetchSnippets(): void {
    if (this.userProfile?._id) {
      this.snippetService
        .getUserSnippets(this.userProfile._id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (snippets) => {
            this.snippets = snippets || [];
            this.updateDashboardValues();
            this.cdr.detectChanges();
          },
          error: (error) => console.error('Failed to fetch snippets:', error)
        });
    }
  }

  handleSnippets(snippetCount: number): void {
    this.snippets.length = snippetCount;
    this.cdr.detectChanges();
  }

  updateMaxSnippets() {
    this.maxSnippets = this.snippetService.getMaxSnippets(this.userProfile?.role);
  }

  subscribeToSnippetCreation() {
    this.snippetService.snippetCreated$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (snippet) => {
        if (snippet) {
          this.fetchSnippets();
        }
      },
      error: (error) => console.error('Error fetching created snippet:', error)
    });
  }

  updateTotalVisitors() {
    if (this.userProfile && Array.isArray(this.userProfile.visitors)) {
      this.totalVisitors = this.userProfile.visitors.length;
      this.updateDashboardValues();
    }
  }

  updateDashboardValues() {
    this.dashboardOverviews = DASHBOARD_OVERVIEWS.map(overview => {
      let value;
      if (overview.index === 1) {
        value = this.snippets.length || 0;
      } else if (overview.index === 2) {
        value = this.totalVisitors; // Correctly set totalVisitors
      } else {
        value = overview.dynamicValue(); // For future dynamic values
      }
      return { ...overview, value }; // Set the value property
    });
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
