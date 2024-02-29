import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser'
import { ImageCroppedEvent } from 'ngx-image-cropper'
import { AuthenticationService } from 'src/app/shared/services/authentication.service'
import { UserService } from 'src/app/shared/services/user.service'
import { NgxImageCompressService, DataUrl } from 'ngx-image-compress'

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

  constructor(
    public user: UserService,
    public authService: AuthenticationService,
    private sanitizer: DomSanitizer,
    private imageCompress: NgxImageCompressService
  ) {}

  get email() {
    return this.firstFormGroup.get('email')
  }

  get username() {
    return this.secondFormGroup.get('username')
  }

  ngOnInit(): void {
    this.firstFormGroup = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required)
    })

    this.secondFormGroup = new FormGroup({
      username: new FormControl('', Validators.required)
    })
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

  registerUser() {
    if (!this.firstFormGroup.get('email')?.value || !this.secondFormGroup.get('username')?.value) {
      return
    }

    const userData = {
      email: this.firstFormGroup.get('email')?.value,
      password: this.firstFormGroup.get('password')?.value,
      name: this.secondFormGroup.get('username')?.value,
      picture: this.imgResultAfterResize || 'assets/images/image-placeholder.png'
    }

    this.authService.createUser(userData).subscribe(
      (response) => {
        console.log('User registration successful', response)
        // Additional logic after successful registration
        // Navigate to another page or show success message
      },
      (error) => {
        console.error('Error during registration', error)
        // Handle error here, like showing an error message to the user
      }
    )
  }
}
