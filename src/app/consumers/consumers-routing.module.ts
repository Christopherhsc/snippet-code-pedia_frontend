import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SnippetOverviewComponent } from './components/snippet-overview/snippet-overview.component'
import { AuthenticatedGuard } from '../shared/guards/authenticated.guard'

const routes: Routes = [
  {
    path: 'snippet/:_id',
    component: SnippetOverviewComponent,
    canActivate: [AuthenticatedGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumersRoutingModule {}
