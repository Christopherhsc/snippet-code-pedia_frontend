import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser'
import { ImageCroppedEvent } from 'ngx-image-cropper'
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

  constructor(
    public user: UserService,
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

    // Debugging: Log the form values when they change
    this.firstFormGroup.valueChanges.subscribe((values) => {
      console.log('First Form Group Values:', values)
    })
    this.secondFormGroup.valueChanges.subscribe((values) => {
      console.log('Second Form Group Values:', values)
    })
  }

  fileChangedEvent(event: any): void {
    if (event !== null) {
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
    const imgUrl = (this.croppedImagePreview as any).changingThisBreaksApplicationSecurity
    this.profileImageChange.emit(imgUrl)
  }

  discardChanges(): void {
    this.isCropping = false
    this.croppedImagePreview = null
  }
}
