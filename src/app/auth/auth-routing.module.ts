import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthContainerComponent } from './auth-container.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AuthContainerComponent
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('../consumers/consumers.module').then((m) => m.ConsumersModule)
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
