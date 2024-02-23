import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

//custom modules
import { SharedModule } from './shared/shared.module'

//custom components
import { HomeComponent } from './home/home.component'
import { CardComponent } from './home/components/card/card.component'
import { LoginComponent } from './auth/login/login.component'

@NgModule({
  declarations: [AppComponent, CardComponent, LoginComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
