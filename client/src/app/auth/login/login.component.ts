import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginApiService } from './services/login-api.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm!: FormGroup;
  private loginSubscription: Subscription = new Subscription();

  constructor(private _fb: FormBuilder, private loginService: LoginApiService, private _router: Router) {
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['Email', [Validators.required, Validators.email]],
      password: ['Password', Validators.required]
    });
  }

  onSubmit() {
    this.loginSubscription = this.loginService.login(this.loginForm.value).subscribe({
      next: (data) => {
        localStorage.setItem("token=", data.token);
        this._router.navigate(['/dashboard']);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  get f() {
    return this.loginForm.controls;
  }
}
