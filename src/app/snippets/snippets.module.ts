import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SnippetComponent } from './snippet.component'
import { SnippetsOverviewComponent } from './components/snippets-overview/snippets-overview.component'

//ang mat
import { MatIconModule } from '@angular/material/icon'

import { SnippetsRoutingModule } from './snippets-routing.module'

@NgModule({
  declarations: [SnippetComponent, SnippetsOverviewComponent],
  imports: [CommonModule, SnippetsRoutingModule, MatIconModule]
})
export class SnippetsModule {}
