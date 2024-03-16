import { Component, EventEmitter, Input, Output } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { Router } from '@angular/router'

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

  constructor(
    private router: Router
  ) {}



  routeToSnippetOverview(_id: string) {
    this.router.navigate(["/",this.snippet._id])
  }



  onDeleteSnippet() {
    this.deleteSnippet.emit(String(this.snippet._id))
  }
}
