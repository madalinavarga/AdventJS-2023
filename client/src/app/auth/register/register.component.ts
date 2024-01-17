import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterApiService } from './services/register-api.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup
  unsubscribe = new Subject<void>();
  constructor(private formBuilder: FormBuilder, private _registerApiService: RegisterApiService, private _router: Router) {

  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
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
    this._registerApiService.register(this.registerForm.value).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: data => {
        this._router.navigate(['/auth/login']);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

}
