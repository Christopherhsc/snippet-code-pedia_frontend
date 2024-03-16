import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SnippetService } from 'src/app/shared/services/snippet.service';

@Component({
  selector: 'app-snippet-overview',
  templateUrl: './snippet-overview.component.html',
  styleUrl: './snippet-overview.component.scss'
})
export class SnippetOverviewComponent {
  snippet: any;
  showHTML: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private snippetService: SnippetService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const snippetId = params['_id'];
      this.fetchSnippet(snippetId);
    });
  }

  private fetchSnippet(id: string) {
    this.snippetService.getSnippetById(id).subscribe(
      (data) => {
        this.snippet = data;
        if (this.snippet.snippetTemplate) {
          this.snippet.formattedTemplate = this.formatSnippet(this.snippet.snippetTemplate);
        }
        if (this.snippet.snippetStyle) {
          this.snippet.formattedStyle = this.formatSnippet(this.snippet.snippetStyle);
        }
      },
      (error) => {
        console.error('Error fetching snippet:', error);
      }
    );
  }

  formatSnippet(snippetContent: string): SafeHtml {
    const formatted = `<pre><code>${this.escapeHtml(snippetContent)}</code></pre>`;
    return this.domSanitizer.bypassSecurityTrustHtml(formatted);
  }

  private escapeHtml(htmlString: string): string {
    return htmlString
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  showHTMLContent() {
    this.showHTML = true;
  }

  showCSSContent() {
    this.showHTML = false;
  }
}
