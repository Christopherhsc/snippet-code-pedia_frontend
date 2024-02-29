import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { ImageCroppedEvent } from 'ngx-image-cropper'
import { AuthenticationService } from 'src/app/shared/services/authentication.service'
import { UserService } from 'src/app/shared/services/user.service'

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
  constructor(
    public user: UserService,
    public authService: AuthenticationService,
    private router: Router,
    private sanitizer: DomSanitizer
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
        this.profileImageChange.emit(base64data) // Emit the base64 string
      }
    } else {
      console.error('Cropped image or blob is undefined')
      // Handle the case where the cropped image is undefined
    }
  }

  discardChanges(): void {
    this.isCropping = false
    this.croppedImagePreview = null
  }

  registerUser() {
    if (this.selectedImageFile) {
      this.resizeImage(this.selectedImageFile, 60, 60).then((resizedImage) => {
        // Now you have the resized image
        if (!this.firstFormGroup.get('email')?.value || !this.secondFormGroup.get('username')?.value) return
        const userData = {
          email: this.firstFormGroup.get('email')?.value,
          name: this.secondFormGroup.get('username')?.value, // Changed from 'username' to 'name'
          picture: resizedImage // Changed from 'imageUrl' to 'picture'
        }
        console.log('THIS IS USERDATA', userData)
        // Proceed with registration
        this.authService.createUser(userData)
      })
    } else {
      // Handle registration without an image or show an error
    }
  }

  resizeImage(file: File, targetWidth: number, targetHeight: number): Promise<string> {
    return new Promise((resolve, reject) => {
      if (file) {
        const reader = new FileReader()
        reader.onload = (readerEvent) => {
          if (!readerEvent.target || !readerEvent.target.result) {
            reject('FileReader did not load the file')
            return
          }

          const image = new Image()
          image.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            if (!ctx) {
              reject('Could not create canvas context')
              return
            }

            canvas.width = targetWidth // Set canvas width to target width
            canvas.height = targetHeight // Set canvas height to target height

            // Draw the image on canvas with the desired dimensions
            ctx.drawImage(image, 0, 0, targetWidth, targetHeight)

            const resizedImage = canvas.toDataURL('image/png')
            resolve(resizedImage)
          }
          image.src = (readerEvent.target as FileReader).result as string
        }
        reader.readAsDataURL(file)
      } else {
        reject('No file selected')
      }
    })
  }
}
