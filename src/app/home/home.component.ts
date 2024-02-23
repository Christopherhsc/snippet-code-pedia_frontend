import { Component } from '@angular/core'
import { AuthenticationService } from '../shared/services/authentication.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(public auth: AuthenticationService) {}
}
