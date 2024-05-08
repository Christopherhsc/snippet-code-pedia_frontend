import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from '../home/home.component'
import { ProfileComponent } from './components/profile/profile.component'
import { SnippetCreateComponent } from './components/snippet-create/snippet-create.component'
import { AuthGuard } from '../shared/guards/auth.guard'
import { SnippetOverviewComponent } from './components/snippet-overview/snippet-overview.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'profile/:userId',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create',
        component: SnippetCreateComponent,
        outlet: 'modal'
      }
    ]
  },
  {
    path: ':_id',
    pathMatch: 'full',
    component: SnippetOverviewComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumersRoutingModule {}
