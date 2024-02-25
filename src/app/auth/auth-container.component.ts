import { ChangeDetectorRef, Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrl: './auth-container.component.scss'
})
export class AuthContainerComponent {
  profileImagePreview: string = '/assets/images/LOGO.png'
  userRegistration: boolean = false

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}
  setUserRegistration() {
    this.userRegistration = !this.userRegistration
  }

  onProfileImageChange(newImagePreview: string): void {
    this.profileImagePreview = newImagePreview
    this.cdRef.detectChanges() // Manually trigger change detection
  }

  closeModal() {
    this.router.navigate(['/'])
  }
}
