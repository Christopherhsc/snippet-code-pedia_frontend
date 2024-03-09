import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

import { HeaderComponent } from './components/header/header.component'
import { NavMobileComponent } from './components/header/nav-mobile.component'

import { capitalizeFirst } from './pipes/capitalize-first.pipe'

@NgModule({
  declarations: [HeaderComponent, NavMobileComponent, capitalizeFirst],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [HeaderComponent, NavMobileComponent, capitalizeFirst]
})
export class SharedModule {}
