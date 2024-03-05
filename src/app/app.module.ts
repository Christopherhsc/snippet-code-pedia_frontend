import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ToastrModule } from 'ngx-toastr'

//custom modules
import { SharedModule } from './shared/shared.module'
import { AuthModule } from './auth/auth.module'

//custom components
import { HomeComponent } from './home/home.component'
import { CardComponent } from './home/components/card/card.component'
import { SnippetComponent } from './snippets/snippet.component'
import { SnippetsOverviewComponent } from './snippets/components/snippets-overview/snippets-overview.component'

//ang mat
import { MatIconModule } from '@angular/material/icon'

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    HomeComponent,
    SnippetComponent,
    SnippetsOverviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,

    MatIconModule,

    ToastrModule.forRoot()
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule {}
