import { Component, OnInit, SecurityContext } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { DataService } from 'src/app/shared/services/data.service'
import { UserService } from 'src/app/shared/services/user.service'

@Component({
  selector: 'app-snippet-card',
  templateUrl: './snippet-card.component.html',
  styleUrl: './snippet-card.component.scss'
})
export class SnippetCardComponent implements OnInit {
  snippets: any[] = []
  userProfile: any

  constructor(
    private dataService: DataService,
    public UserService: UserService
  ) {}

  ngOnInit() {
    this.UserService.getUserProfile().subscribe((profile) => {
      this.userProfile = profile
    })
    this.loadSnippets()
  }

  loadSnippets() {
    this.dataService.getNineSnippets().subscribe(
      (data) => {
        this.snippets = data
      },
      (error) => {
        console.error('Error fetching snippets', error)
      }
    )
  }
}
