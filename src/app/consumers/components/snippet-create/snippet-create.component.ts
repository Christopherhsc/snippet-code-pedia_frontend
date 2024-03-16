import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { DataUrl, NgxImageCompressService } from 'ngx-image-compress'
import { ImageCroppedEvent } from 'ngx-image-cropper'
import { SnippetService } from 'src/app/shared/services/snippet.service'
import { UserService } from 'src/app/shared/services/user.service'

@Component({
  selector: 'app-snippet-create',
  templateUrl: './snippet-create.component.html',
  styleUrl: './snippet-create.component.scss'
})
export class SnippetCreateComponent implements OnInit {
  snippetForm!: FormGroup
  showCssTextarea: boolean = false

  imageChangedEvent: any = ''
  selectedImageFile: File | null = null
  isCropping: boolean = false
  croppedImagePreview: any = ''
  croppedImage?: ImageCroppedEvent

  constructor(
    private formBuilder: FormBuilder,
    private snippetService: SnippetService,
    private router: Router,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private imageCompress: NgxImageCompressService
  ) {
    this.initForm()
  }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((userProfile) => {
      // Update form values
      if (userProfile) {
        this.snippetForm.patchValue({
          username: userProfile.username,
          email: userProfile.email,
          userId: userProfile._id
        })
      }
    })
  }

  private initForm(): void {
    this.snippetForm = this.formBuilder.group({
      title: ['', Validators.required],
      picture: [''],
      description: ['', Validators.required],
      snippetTemplate: ['', Validators.required],
      snippetStyle: [''],
      tags: [''],
      username: ['', Validators.required],
      email: ['', Validators.required],
      userId: ['', Validators.required]
    })
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
    } else {
      console.error('Cropped image or blob is undefined')
    }
  }

  uploadAndResize(image: string): void {
    // Update your form data here
    this.snippetForm.get('picture')
  }

  discardChanges(): void {
    this.isCropping = false
    this.croppedImagePreview = null
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImagePreview = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!)
    this.croppedImage = event
  }

  toggleCssTextarea() {
    this.showCssTextarea = !this.showCssTextarea
  }

  onSubmit() {
    if (this.snippetForm.valid) {
      // If there's an image to crop
      if (this.croppedImage && this.croppedImage.blob) {
        const reader = new FileReader()
        reader.readAsDataURL(this.croppedImage.blob)
        reader.onloadend = () => {
          const base64data = reader.result as string

          // Set the cropped image's base64 data to the form
          this.snippetForm.patchValue({ picture: base64data })
          this.submitForm()
        }
      } else {
        // If there's no image to crop, submit the form as is
        this.submitForm()
      }
    }
  }

  private submitForm() {
    const image = this.snippetForm.get('picture')?.value;
  
    if (image) {
      // Log the size of the base64 image data
      const sizeInBytes = this.base64StringLength(image);
      console.log(`Image size: ${sizeInBytes} bytes`);
  
      // Check if the size is within an acceptable range
      // For example, 1MB = 1 * 1024 * 1024 bytes
      if (sizeInBytes > 10 * 1024 * 1024) {
        console.error('Image size exceeds 10MB');
        // Handle the error: alert the user, resize the image, etc.
        return;
      }
    }
  
    this.snippetService.postSnippet(this.snippetForm.value).subscribe(
      (response) => {
        console.log('Snippet submitted', response);
        this.router.navigate(['profile']);
      },
      (error) => {
        console.error('Error submitting snippet', error);
      }
    );
  }
  
  // Helper function to calculate the size of a base64 string
  private base64StringLength(base64String: string): number {
    const padding = (base64String.match(/(=+)$/g) || []).length;
    const size = (base64String.length * 3) / 4 - padding;
    return size;
  }
}
