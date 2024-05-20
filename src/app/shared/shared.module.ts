import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

import { HeaderComponent } from './components/header/header.component'
import { SnippetCardComponent } from './components/snippet-card/snippet-card.component'
import { CardDetailsComponent } from './components/snippet-card/card-details/card-details.component'
import { NavMobileComponent } from './components/header/nav-mobile.component'

import { capitalizeFirst } from './pipes/capitalize-first.pipe'

//ang mat
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [
    HeaderComponent,
    SnippetCardComponent,
    CardDetailsComponent,
    NavMobileComponent,
    capitalizeFirst,
  ],
  imports: [CommonModule, RouterModule, HttpClientModule, MatIconModule],
  exports: [
    HeaderComponent,
    SnippetCardComponent,
    CardDetailsComponent,
    NavMobileComponent,
    capitalizeFirst,
  ]
})
export class SharedModule {}
