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
    path: 'profile',
    pathMatch: 'full',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: SnippetCreateComponent,
    canActivate: [AuthGuard]
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
