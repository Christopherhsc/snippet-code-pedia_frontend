import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrl: './auth-container.component.scss'
})
export class AuthContainerComponent {
  userRegistration: boolean = true

  constructor(private router: Router) {}
  setUserRegistration() {
    this.userRegistration = !this.userRegistration
  }

  closeModal() {
    this.router.navigate(['/'])
  }
}