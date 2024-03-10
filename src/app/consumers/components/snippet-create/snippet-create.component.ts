import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { SnippetService } from 'src/app/shared/services/snippet.service'
import { UserService } from 'src/app/shared/services/user.service'

@Component({
  selector: 'app-snippet-create',
  templateUrl: './snippet-create.component.html',
  styleUrl: './snippet-create.component.scss'
})
export class SnippetCreateComponent {
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
          this.router.navigate(['profile'])
        },
        (error: any) => {
          console.error('Error submitting snippet', error)
        }
      )
    }
  }
}
