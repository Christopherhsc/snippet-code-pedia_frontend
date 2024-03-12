import { Component, EventEmitter, Input, Output } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss'
})
export class CardDetailsComponent {
  @Input() snippet: any
  @Input() userProfile: any
  @Input() showDeleteSnippet: boolean = false
  @Output() deleteSnippet = new EventEmitter<string>()

  constructor(private domSanitizer: DomSanitizer) {}

  formatSnippet(snippetTemplate: string): SafeHtml {
    const formatted = `<pre><code>${this.escapeHtml(snippetTemplate)}</code></pre>`
    return this.domSanitizer.bypassSecurityTrustHtml(formatted)
  }

  private escapeHtml(htmlString: string): string {
    return htmlString
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  onDeleteSnippet() {
    this.deleteSnippet.emit(String(this.snippet._id))
  }
}
