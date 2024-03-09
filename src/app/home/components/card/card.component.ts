import { Component, OnInit, SecurityContext } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { DataService } from 'src/app/shared/services/data.service'
import { UserService } from 'src/app/shared/services/user.service'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  snippets: any[] = []
  userProfile: any

  constructor(
    private dataService: DataService,
    private domSanitizer: DomSanitizer,
    public UserService: UserService
  ) {}

  ngOnInit() {
    this.UserService.getUserProfile().subscribe((profile) => {
      this.userProfile = profile
    })
    this.loadSnippets()
  }

  loadSnippets() {
    this.dataService.getAllSnippets().subscribe(
      (data) => {
        this.snippets = data
      },
      (error) => {
        console.error('Error fetching snippets', error)
      }
    )
  }

  capitalizeFirstLetter(value: string): string {
    if (value && value.length > 0) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }

  formatSnippet(snippetTemplate: string): SafeHtml {
    // No need to replace \n with <br> because <pre> respects new lines.
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
}
