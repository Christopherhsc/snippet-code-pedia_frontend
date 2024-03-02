import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core'
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { StepperSelectionEvent } from '@angular/cdk/stepper'

// NGX
import { ImageCroppedEvent } from 'ngx-image-cropper'
import { NgxImageCompressService, DataUrl } from 'ngx-image-compress'

// SERVICS
import { AuthenticationService } from 'src/app/shared/services/authentication.service'
import { UserService } from 'src/app/shared/services/user.service'
import { CustomToastrService } from 'src/app/shared/services/custom-toastr.service'

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value
    const confirmPassword = control.get('confirmPassword')?.value

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDontMatch: true
      }
    }
    return null
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  @Output() toggleView = new EventEmitter<void>()
  @Output() profileImageChange = new EventEmitter<string>()
  firstFormGroup!: FormGroup
  secondFormGroup!: FormGroup

  imageChangedEvent: any = ''
  croppedImagePreview: any = ''
  isCropping: boolean = false
  croppedImage?: ImageCroppedEvent
  selectedFile: File | null = null
  selectedImageFile: File | null = null
  imgResultAfterResize: string = ''
  currentStepIndex = 0
  emailBlurred = false

  constructor(
    public user: UserService,
    public authService: AuthenticationService,
    private sanitizer: DomSanitizer,
    private imageCompress: NgxImageCompressService,
    private router: Router,
    private customToaster: CustomToastrService,
    private ngZone: NgZone
  ) {}

  get email() {
    return this.firstFormGroup.get('email')
  }

  get username() {
    return this.secondFormGroup.get('username')
  }

  ngOnInit(): void {
    this.firstFormGroup = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(/^.+@.+\..+$/)
        ]),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required)
      },
      { validators: passwordsMatchValidator() }
    )

    this.secondFormGroup = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15)
      ])
    })
  }

  onStepChange(event: StepperSelectionEvent): void {
    if (event.selectedIndex > this.currentStepIndex) {
      if (this.firstFormGroup.invalid && this.currentStepIndex === 0) {
        this.currentStepIndex = 0 // Reset to the first step
      } else {
        this.currentStepIndex = event.selectedIndex
      }
    } else {
      this.currentStepIndex = event.selectedIndex // Allow going back
    }
  }

  fileChangedEvent(event: any): void {
    this.selectedImageFile = event.target.files[0]
    if (this.selectedImageFile) {
      this.isCropping = true
    }
    this.imageChangedEvent = event
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImagePreview = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!)
    this.croppedImage = event
  }

  applyCroppedImage(): void {
    this.isCropping = false

    if (this.croppedImage && this.croppedImage.blob) {
      const reader = new FileReader()
      reader.readAsDataURL(this.croppedImage.blob)
      reader.onloadend = () => {
        const base64data = reader.result as string
        this.croppedImagePreview = base64data

        // Emit the original image data URL to the parent component
        this.profileImageChange.emit(base64data)

        this.uploadAndResize(base64data)
      }
    } else {
      console.error('Cropped image or blob is undefined')
    }
  }

  discardChanges(): void {
    this.isCropping = false
    this.croppedImagePreview = null
  }

  uploadAndResize(image: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.imageCompress
        .compressFile(image, -1, 100, 100, 100, 100)
        .then((result: DataUrl) => {
          this.imgResultAfterResize = result
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result))
          resolve(result)
        })
        .catch((err) => {
          console.error('Error during image compression:', err)
          reject(err)
        })
    })
  }

  capitalizeFirstLetter(value: string): string {
    if (value && value.length > 0) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }

  registerUser() {
    if (
      !this.firstFormGroup.get('email')?.value ||
      !this.secondFormGroup.get('username')?.value
    ) {
      return
    }

    const registrationType = 'SCP'
    const userData = {
      email: this.firstFormGroup.get('email')?.value,
      password: this.firstFormGroup.get('password')?.value,
      name: this.capitalizeFirstLetter(this.secondFormGroup.get('username')?.value),
      picture: this.imgResultAfterResize || 'assets/images/image-placeholder.png',
      registrationMethod: registrationType
    }

    this.authService.createUser(userData).subscribe({
      next: (response) => {
        this.customToaster.success(
          `Welcome to Snippet-Code-Pedia ${response.username}`,
          'Registration successful!'
        )
        this.ngZone.run(() => {
          this.router.navigate(['/'])
        })
      },
      error: (error) => {
        console.error('Error during registration', error)
      }
    })
  }
}
