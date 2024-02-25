import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { AuthRoutingModule } from './auth-routing.module'

import { AuthContainerComponent } from './auth-container.component'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { DividerComponent } from './components/divider/divider.component'

//ang mat
import { MatStepperModule } from '@angular/material/stepper'

@NgModule({
  declarations: [AuthContainerComponent, LoginComponent, RegisterComponent, DividerComponent],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule, MatStepperModule],
  exports: [AuthContainerComponent, LoginComponent, RegisterComponent, DividerComponent]
})
export class AuthModule {}
