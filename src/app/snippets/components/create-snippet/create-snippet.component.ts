import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-create-snippet',

  templateUrl: './create-snippet.component.html',
  styleUrl: './create-snippet.component.scss'
})
export class CreateSnippetComponent {
  snippetForm: FormGroup
  showCssTextarea: boolean = false

  constructor(private formBuilder: FormBuilder) {
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
    console.log(this.snippetForm.value)
  }
}
