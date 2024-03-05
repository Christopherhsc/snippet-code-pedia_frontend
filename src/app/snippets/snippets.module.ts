import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { SnippetComponent } from './snippet.component'
import { SnippetsOverviewComponent } from './components/snippets-overview/snippets-overview.component'
import { CreateSnippetComponent } from './components/create-snippet/create-snippet.component'

//ang mat
import { MatIconModule } from '@angular/material/icon'

import { SnippetsRoutingModule } from './snippets-routing.module'

@NgModule({
  declarations: [SnippetComponent, SnippetsOverviewComponent, CreateSnippetComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SnippetsRoutingModule,
    MatIconModule
  ]
})
export class SnippetsModule {}
