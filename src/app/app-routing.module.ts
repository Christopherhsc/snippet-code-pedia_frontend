// app-routing.module.ts
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { ProfileComponent } from './consumers/components/profile/profile.component'
import { SnippetCreateComponent } from './consumers/components/snippet-create/snippet-create.component'
import { SnippetOverviewComponent } from './consumers/components/snippet-overview/snippet-overview.component'
import { AuthenticatedGuard } from './shared/guards/authenticated.guard'
import { UnauthenticatedGuard } from './shared/guards/unauthenticated-guard.guard'
import { AuthContainerComponent } from './auth/auth-container.component'
import { SnippetFilterComponent } from './consumers/components/snippet-filter/snippet-filter.component'

// app-routing.module.ts
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'filter',
        component: SnippetFilterComponent,
        outlet: 'modal'
      }
    ]
  },
  {
    path: 'login',
    component: AuthContainerComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'profile/:userId',
    component: ProfileComponent,
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: 'create',
        component: SnippetCreateComponent,
        outlet: 'modal'
      }
    ]
  },
  {
    path: 'create',
    outlet: 'modal',
    component: SnippetCreateComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'snippet/:_id',
    component: SnippetOverviewComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
