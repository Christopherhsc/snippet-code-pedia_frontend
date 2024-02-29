import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { AuthRoutingModule } from './auth-routing.module'
import { ImageCropperModule } from 'ngx-image-cropper'
import { NgxImageCompressService } from 'ngx-image-compress'

import { AuthContainerComponent } from './auth-container.component'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { DividerComponent } from './components/divider/divider.component'

//ang mat
import { MatStepperModule } from '@angular/material/stepper'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [AuthContainerComponent, LoginComponent, RegisterComponent, DividerComponent],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule, ImageCropperModule, MatStepperModule, MatIconModule],
  providers: [NgxImageCompressService],
  exports: [AuthContainerComponent, LoginComponent, RegisterComponent, DividerComponent]
})
export class AuthModule {}
