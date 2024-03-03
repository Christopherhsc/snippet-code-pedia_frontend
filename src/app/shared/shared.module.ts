import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

import { HeaderComponent } from './components/header/header.component'
import { NavMobileComponent } from './components/header/nav-mobile.component'

@NgModule({
  declarations: [HeaderComponent, NavMobileComponent],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [HeaderComponent, NavMobileComponent]
})
export class SharedModule {}
