import { Component, OnInit } from '@angular/core'
import { trigger, state, style, transition, animate } from '@angular/animations'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser'
import { Router, ActivatedRoute } from '@angular/router'
import { NgxImageCompressService } from 'ngx-image-compress'
import { ImageCroppedEvent } from 'ngx-image-cropper'
import { AuthenticationService } from 'src/app/shared/services/authentication.service'
import { SnippetService } from 'src/app/shared/services/snippet.service'
import { UserService } from 'src/app/shared/services/user.service'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

@Component({
  selector: 'app-snippet-create',
  templateUrl: './snippet-create.component.html',
  styleUrls: ['./snippet-create.component.scss'],
  animations: [
    trigger('slideIn', [
      state(
        'open',
        style({
          transform: 'translateX(0)'
        })
      ),
      state(
        'closed',
        style({
          transform: 'translateX(-100%)'
        })
      ),
      transition('closed => open', [animate('300ms ease-in')]),
      transition('open => closed', [animate('300ms ease-out')])
    ])
  ]
})
export class SnippetCreateComponent implements OnInit {
  snippetForm!: FormGroup
  showCssTextarea = false
  imageChangedEvent: any = ''
  selectedImageFile: File | null = null
  isCropping = false
  croppedImagePreview: any = ''
  croppedImage?: ImageCroppedEvent
  isSmallScreen = false
  isOpen = false

  constructor(
    private formBuilder: FormBuilder,
    private snippetService: SnippetService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthenticationService,
    private sanitizer: DomSanitizer,
    private imageCompress: NgxImageCompressService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.initForm()
    this.observeScreenSize()
  }

  ngOnInit(): void {
    this.initForm()
    this.loadFormData()

    const userId = this.authService.getCurrentUserId()
    if (userId) {
      this.userService.getUserProfile(userId).subscribe((userProfile) => {
        if (userProfile) {
          this.snippetForm.patchValue({
            username: userProfile.username,
            email: userProfile.email,
            userId: userProfile._id
          })
        }
      })
    } else {
      console.error('No logged-in user found')
      this.router.navigate(['/login'])
    }

    setTimeout(() => {
      this.isOpen = true
    })
  }

  private initForm(): void {
    this.snippetForm = this.formBuilder.group({
      title: ['', Validators.required],
      picture: ['', Validators.required],
      pictureWidth: [''],
      pictureHeight: [''],
      description: ['', Validators.required],
      snippetTemplate: ['', Validators.required],
      snippetStyle: [''],
      tags: [''],
      username: ['', Validators.required],
      email: ['', Validators.required],
      userId: ['', Validators.required]
    })
  }

  observeScreenSize(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Small])
      .subscribe((result) => {
        this.isSmallScreen = result.matches
      })
  }

  private loadFormData(): void {
    const savedFormData = localStorage.getItem('snippetFormData')
    if (savedFormData) {
      this.snippetForm.setValue(JSON.parse(savedFormData))
    }
  }

  fileChangedEvent(event: any): void {
    this.selectedImageFile = event.target.files[0]
    if (this.selectedImageFile) {
      this.isCropping = true
    }
    this.imageChangedEvent = event
  }

  applyCroppedImage(): void {
    this.isCropping = false

    if (this.croppedImage && this.croppedImage.blob) {
      const reader = new FileReader()
      reader.readAsDataURL(this.croppedImage.blob)
      reader.onloadend = () => {
        const base64data = reader.result as string
        this.croppedImagePreview = base64data
        this.uploadAndResize(base64data)
      }

      // Set the cropped image dimensions
      this.snippetForm.patchValue({
        pictureWidth: this.croppedImage.width,
        pictureHeight: this.croppedImage.height
      })
    } else {
      console.error('Cropped image or blob is undefined')
    }
  }

  uploadAndResize(image: string): void {
    this.snippetForm.get('picture')?.setValue(image)
  }

  discardChanges(): void {
    this.isCropping = false
    this.croppedImagePreview = null
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImagePreview = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!)
    this.croppedImage = event
  }

  toggleCssTextarea(): void {
    this.showCssTextarea = !this.showCssTextarea
  }

  onSubmit(): void {
    if (this.snippetForm.valid) {
      const formData = this.snippetForm.value
      this.snippetService.addSnippet(formData).subscribe({
        next: () => {
          this.goToProfile()
        },
        error: (error) => {
          console.error('Error adding snippet', error)
        }
      })
    }
  }

  goToProfile(): void {
    const userId = this.authService.getCurrentUserId()
    if (userId) {
      this.router.navigate(['/profile', userId])
      this.closeModal()
    } else {
      console.error('User ID is not available')
    }
  }

  private base64StringLength(base64String: string): number {
    const padding = (base64String.match(/(=+)$/g) || []).length
    const size = (base64String.length * 3) / 4 - padding
    return size
  }

  closeModal(): void {
    if (this.snippetForm.dirty) {
      localStorage.setItem('snippetFormData', JSON.stringify(this.snippetForm.value))
    }
    this.isOpen = false
    setTimeout(() => {
      this.router.navigate(['../'], { relativeTo: this.route })
    }, 300)
  }
}
