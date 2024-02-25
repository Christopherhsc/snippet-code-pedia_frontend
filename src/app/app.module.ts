import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

//custom modules
import { SharedModule } from './shared/shared.module'
import { AuthModule } from './auth/auth.module'

//custom components
import { HomeComponent } from './home/home.component'

import { CardComponent } from './home/components/card/card.component'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

@NgModule({
  declarations: [AppComponent, CardComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, AuthModule],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule {}
