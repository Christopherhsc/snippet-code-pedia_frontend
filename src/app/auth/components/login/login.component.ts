import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, Renderer2, EventEmitter, Output } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from 'src/app/shared/services/authentication.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'

declare var google: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewChecked {
  @Output() toggleView = new EventEmitter<void>();
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    
    // Initialize Google accounts
    google.accounts.id.initialize({
      client_id: '680135166777-br7v67f58p397dcjr0an153i64paabh4.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp)
    })
  }

  ngAfterViewChecked(): void {
    const googleBtnElement = document.getElementById('google-btn')
    if (googleBtnElement) {
      google.accounts.id.renderButton(googleBtnElement, {
        theme: 'filled_white',
        size: 'small',
        shape: 'rectangle',
        width: '235'
      })
    }
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]))
  }

  handleLogin(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential)
      this.authService.login(payload)
      this.router.navigate(['/'])
    }
  }
}
