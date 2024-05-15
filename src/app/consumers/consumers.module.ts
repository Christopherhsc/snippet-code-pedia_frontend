import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ConsumersRoutingModule } from './consumers-routing.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { ImageCropperModule } from 'ngx-image-cropper'
import { NgxImageCompressService } from 'ngx-image-compress'

//cust components
import { ProfileComponent } from './components/profile/profile.component'
// child for ProfileComponent
import { SnippetStatisticsComponent } from './components/profile/snippet-statistics/snippet-statistics.component'
// childs for SnippetStatisticsComponent
import { TotalCommentsComponent } from './components/profile/snippet-statistics/components/total-comments/total-comments.component'
import { TotalFollowersComponent } from './components/profile/snippet-statistics/components/total-followers/total-followers.component'
import { TotalPositivesComponent } from './components/profile/snippet-statistics/components/total-positives/total-positives.component'
import { TotalSnippetsComponent } from './components/profile/snippet-statistics/components/total-snippets/total-snippets.component'
import { TotalVisitorsComponent } from './components/profile/snippet-statistics/components/total-visitors/total-visitors.component'

import { SnippetCreateComponent } from './components/snippet-create/snippet-create.component'
import { SnippetOverviewComponent } from './components/snippet-overview/snippet-overview.component'
import { SearchBarComponent } from './components/search-bar/search-bar.component'
import { SnippetFilterComponent } from './components/snippet-filter/snippet-filter.component'

import { SharedModule } from '../shared/shared.module'

//ang mat
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [
    ProfileComponent,
    SnippetStatisticsComponent,
    SnippetCreateComponent,
    TotalCommentsComponent,
    TotalFollowersComponent,
    TotalPositivesComponent,
    TotalSnippetsComponent,
    TotalVisitorsComponent,

    SnippetOverviewComponent,
    SearchBarComponent,
    SnippetFilterComponent
  ],
  imports: [
    CommonModule,
    ConsumersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ImageCropperModule,
    SharedModule,
    MatIconModule
  ],
  providers: [NgxImageCompressService],
  exports: [
    ProfileComponent,
    SnippetStatisticsComponent,
    SnippetCreateComponent,
    TotalCommentsComponent,
    TotalFollowersComponent,
    TotalPositivesComponent,
    TotalSnippetsComponent,
    TotalVisitorsComponent,

    SnippetStatisticsComponent,
    SnippetOverviewComponent,
    SearchBarComponent,
    SnippetFilterComponent
  ]
})
export class ConsumersModule {}
