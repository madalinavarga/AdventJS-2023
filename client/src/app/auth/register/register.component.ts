import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterApiService } from './services/register-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup
  constructor(private _formBuilder: FormBuilder, private _registerApiService: RegisterApiService, private _router: Router) {

  }
  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      email: ['Email', [Validators.required, Validators.email]],
      password: ['Password', Validators.required],
      firstName: ['First Name', Validators.required],
      lastName: ['Last Name', Validators.required],
    })
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this._registerApiService.register(this.registerForm.value).subscribe({
      next: data => {
        console.log("OK", data);
        this._router.navigate(['/auth/login']);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })

  }

}
