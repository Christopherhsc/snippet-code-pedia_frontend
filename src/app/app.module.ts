import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

//custom modules
import { SharedModule } from './shared/shared.module'

//custom components
import { HomeComponent } from './home/home.component'
import { CardComponent } from './home/components/card/card.component'
import { LoginComponent } from './auth/login/login.component'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

//ang material
import { MatStepperModule } from '@angular/material/stepper'

@NgModule({
  declarations: [AppComponent, CardComponent, LoginComponent, HomeComponent],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule, SharedModule, MatStepperModule],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule {}
