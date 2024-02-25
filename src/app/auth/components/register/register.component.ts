import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  @Output() toggleView = new EventEmitter<void>();
  
  firstFormGroup!: FormGroup
  secondFormGroup!: FormGroup
  ngOnInit(): void {
    this.firstFormGroup = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required)
    })

    this.secondFormGroup = new FormGroup({
      username: new FormControl('', Validators.required)
      // Additional controls...
    })
  }
}
