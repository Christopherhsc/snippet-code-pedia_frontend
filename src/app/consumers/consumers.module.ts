import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ConsumersRoutingModule } from './consumers-routing.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

//cust components
import { ProfileComponent } from './components/profile/profile.component'
import { SnippetCreateComponent } from './components/snippet-create/snippet-create.component'
import { SnippetStatisticsComponent } from './components/snippet-statistics/snippet-statistics.component'

//ang mat
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [ProfileComponent, SnippetCreateComponent, SnippetStatisticsComponent],
  imports: [
    CommonModule,
    ConsumersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule
  ]
})
export class ConsumersModule {}
