import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UserService } from 'src/app/shared/services/user.service'

@Component({
  selector: 'app-snippet-card',
  templateUrl: './snippet-card.component.html',
  styleUrl: './snippet-card.component.scss'
})
export class SnippetCardComponent implements OnInit {
  @Input() snippets: any[] = []
  @Input() showDeleteSnippet: boolean = false;
  @Output() deleteSnippet = new EventEmitter<string>();

  userProfile: any

  constructor(public UserService: UserService) {}

  ngOnInit() {
    this.UserService.getUserProfile().subscribe((profile) => {
      this.userProfile = profile
    })
  }

  onDeleteSnippet(snippetId: string) {
    this.deleteSnippet.emit(snippetId);
  }
}
