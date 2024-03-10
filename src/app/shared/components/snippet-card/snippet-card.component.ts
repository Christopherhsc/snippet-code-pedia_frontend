import { Component, Input, OnInit, SecurityContext } from '@angular/core'
import { UserService } from 'src/app/shared/services/user.service'

@Component({
  selector: 'app-snippet-card',
  templateUrl: './snippet-card.component.html',
  styleUrl: './snippet-card.component.scss'
})
export class SnippetCardComponent implements OnInit {
  @Input() snippets: any[] = []
  userProfile: any

  constructor(public UserService: UserService) {}

  ngOnInit() {
    this.UserService.getUserProfile().subscribe((profile) => {
      this.userProfile = profile
    })
  }
}
