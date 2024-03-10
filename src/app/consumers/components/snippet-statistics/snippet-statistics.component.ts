import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snippet-statistics',
  templateUrl: './snippet-statistics.component.html',
  styleUrl: './snippet-statistics.component.scss'
})
export class SnippetStatisticsComponent {
  @Input() snippets: any[] = [];
}
