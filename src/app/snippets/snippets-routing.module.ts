import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SnippetComponent } from './snippet.component'
import { CreateSnippetComponent } from './components/create-snippet/create-snippet.component'

const routes: Routes = [
  {
    path: '',
    component: SnippetComponent
  },{
    path: 'create',
    component: CreateSnippetComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnippetsRoutingModule {}
