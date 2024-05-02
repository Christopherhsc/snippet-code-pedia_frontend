import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ConsumersRoutingModule } from './consumers-routing.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { ImageCropperModule } from 'ngx-image-cropper'
import { NgxImageCompressService } from 'ngx-image-compress'

//cust components
import { ProfileComponent } from './components/profile/profile.component'
import { SnippetCreateComponent } from './components/snippet-create/snippet-create.component'
import { SnippetStatisticsComponent } from './components/snippet-statistics/snippet-statistics.component'
import { SnippetOverviewComponent } from './components/snippet-overview/snippet-overview.component'
import { SearchBarComponent } from './components/search-bar/search-bar.component'

import { SharedModule } from '../shared/shared.module'

//ang mat
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [
    ProfileComponent,
    SnippetCreateComponent,
    SnippetStatisticsComponent,
    SnippetOverviewComponent,
    SearchBarComponent
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
    SnippetCreateComponent,
    SnippetStatisticsComponent,
    SnippetOverviewComponent,
    SearchBarComponent
  ]
})
export class ConsumersModule {}
