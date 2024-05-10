// snippet-statistics.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snippet-statistics',
  templateUrl: './snippet-statistics.component.html',
  styleUrls: ['./snippet-statistics.component.scss']
})
export class SnippetStatisticsComponent {
  @Input() snippets: any[] = [];
  @Input() totalVisitors: number = 0;
}
