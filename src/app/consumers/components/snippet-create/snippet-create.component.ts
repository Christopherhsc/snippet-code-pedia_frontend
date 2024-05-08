// snippet-create.component.ts
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { SnippetService } from 'src/app/shared/services/snippet.service';
import { UserService } from 'src/app/shared/services/user.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-snippet-create',
  templateUrl: './snippet-create.component.html',
  styleUrls: ['./snippet-create.component.scss'],
  animations: [
    trigger('slideIn', [
      state(
        'open',
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        'closed',
        style({
          transform: 'translateX(-100%)',
        })
      ),
      transition('closed => open', [animate('300ms ease-in')]),
      transition('open => closed', [animate('300ms ease-out')]),
    ]),
  ],
})
export class SnippetCreateComponent implements OnInit {
  snippetForm!: FormGroup;
  showCssTextarea = false;
  imageChangedEvent: any = '';
  selectedImageFile: File | null = null;
  isCropping = false;
  croppedImagePreview: any = '';
  croppedImage?: ImageCroppedEvent;
  isSmallScreen = false;
  isOpen = false;

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
    this.initForm();
    this.observeScreenSize();
  }

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId(); // Get the current user ID from AuthenticationService
    if (userId) {
      this.userService.getUserProfile(userId).subscribe((userProfile) => {
        if (userProfile) {
          this.snippetForm.patchValue({
            username: userProfile.username,
            email: userProfile.email,
            userId: userProfile._id,
          });
        }
      });
    } else {
      // Handle cases where there is no logged-in user
      console.error('No logged-in user found');
      this.router.navigate(['/login']); // Redirect to login or appropriate action
    }
  
    // Trigger the opening animation
    setTimeout(() => {
      this.isOpen = true;
    });
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
      userId: ['', Validators.required],
    });
  }

  observeScreenSize(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Small])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }

  fileChangedEvent(event: any): void {
    this.selectedImageFile = event.target.files[0];
    if (this.selectedImageFile) {
      this.isCropping = true;
    }
    this.imageChangedEvent = event;
  }

  applyCroppedImage(): void {
    this.isCropping = false;

    if (this.croppedImage && this.croppedImage.blob) {
      const reader = new FileReader();
      reader.readAsDataURL(this.croppedImage.blob);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        this.croppedImagePreview = base64data;
        this.uploadAndResize(base64data);
      };
    } else {
      console.error('Cropped image or blob is undefined');
    }
  }

  uploadAndResize(image: string): void {
    this.snippetForm.get('picture')?.setValue(image);
  }

  discardChanges(): void {
    this.isCropping = false;
    this.croppedImagePreview = null;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImagePreview = this.sanitizer.bypassSecurityTrustUrl(
      event.objectUrl!
    );
    this.croppedImage = event;
  }

  toggleCssTextarea(): void {
    this.showCssTextarea = !this.showCssTextarea;
  }

  onSubmit(): void {
    if (this.snippetForm.valid) {
      if (this.croppedImage && this.croppedImage.blob) {
        const reader = new FileReader();
        reader.readAsDataURL(this.croppedImage.blob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          this.snippetForm.patchValue({ picture: base64data });
          this.submitForm();
        };
      } else {
        this.submitForm();
      }
    }
  }

  private submitForm(): void {
    const image = this.snippetForm.get('picture')?.value;

    if (image) {
      const sizeInBytes = this.base64StringLength(image);
      console.log(`Image size: ${sizeInBytes} bytes`);

      if (sizeInBytes > 10 * 1024 * 1024) {
        console.error('Image size exceeds 10MB');
        return;
      }
    }

    this.snippetService.postSnippet(this.snippetForm.value).subscribe(
      (response) => {
        console.log('Snippet submitted', response);
        this.closeModal();
      },
      (error) => {
        console.error('Error submitting snippet', error);
      }
    );
  }

  private base64StringLength(base64String: string): number {
    const padding = (base64String.match(/(=+)$/g) || []).length;
    const size = (base64String.length * 3) / 4 - padding;
    return size;
  }

  closeModal(): void {
    this.isOpen = false; // Trigger the closing animation
    setTimeout(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    }, 300); // Match the animation duration
  }
}
