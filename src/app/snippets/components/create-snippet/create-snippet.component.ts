import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { SnippetService } from 'src/app/shared/services/snippet.service'

@Component({
  selector: 'app-create-snippet',

  templateUrl: './create-snippet.component.html',
  styleUrl: './create-snippet.component.scss'
})
export class CreateSnippetComponent {
  snippetForm: FormGroup
  showCssTextarea: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private snippetService: SnippetService,
    private router: Router
  ) {
    this.snippetForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      snippetTemplate: ['', Validators.required],
      snippetStyle: [''],
      tags: ['']
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
          this.router.navigate(["/"])
        },
        (error: any) => {
          console.error('Error submitting snippet', error)
          // Handle error here
        }
      )
    }
  }
}
