import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthContainerComponent } from './auth-container.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AuthContainerComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
