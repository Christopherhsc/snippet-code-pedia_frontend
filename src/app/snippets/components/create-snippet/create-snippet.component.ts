import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { SnippetService } from 'src/app/shared/services/snippet.service'
import { UserService } from 'src/app/shared/services/user.service' // Assuming UserService is available

@Component({
  selector: 'app-create-snippet',
  templateUrl: './create-snippet.component.html',
  styleUrl: './create-snippet.component.scss'
})
export class CreateSnippetComponent {
  snippetForm!: FormGroup
  showCssTextarea: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private snippetService: SnippetService,
    private router: Router,
    private userService: UserService
  ) {
    this.userService.getUserProfile().subscribe((userProfile) => {
      this.snippetForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        snippetTemplate: ['', Validators.required],
        snippetStyle: [''],
        tags: [''],
        username: [userProfile?.username, Validators.required],
        email: [userProfile?.email, Validators.required]
      })
    })
  }

  toggleCssTextarea() {
    this.showCssTextarea = !this.showCssTextarea
  }

  onSubmit() {
    if (this.snippetForm.valid) {
      this.snippetService.postSnippet(this.snippetForm.value).subscribe(
        (response: any) => {
          console.log('Snippet submitted', response)
          this.router.navigate(['/snippet'])
        },
        (error: any) => {
          console.error('Error submitting snippet', error)
        }
      )
    }
  }
}
