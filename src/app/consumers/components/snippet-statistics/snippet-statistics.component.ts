import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { SnippetService } from 'src/app/shared/services/snippet.service'

@Component({
  selector: 'app-snippet-statistics',
  templateUrl: './snippet-statistics.component.html',
  styleUrls: ['./snippet-statistics.component.scss']
})
export class SnippetStatisticsComponent implements OnInit, OnDestroy {
  @Input() snippets: any[] = []
  @Input() totalVisitors: number = 0
  @Input() userRole: number = 1

  maxSnippets: number = Infinity
  private subscriptions = new Subscription()
  Infinity: any

  constructor(public snippetService: SnippetService) {}

  ngOnInit() {
    this.updateMaxSnippets()

    this.subscriptions.add(this.snippetService.snippetCount$.subscribe((count) => {}))
  }

  updateMaxSnippets() {
    this.maxSnippets = this.snippetService.getMaxSnippets(this.userRole)
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
