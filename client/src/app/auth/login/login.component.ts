import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginApiService } from './services/login-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(private _fb: FormBuilder, private _loginService: LoginApiService, private _router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['Email', [Validators.required, Validators.email]],
      password: ['Password', Validators.required]
    });
  }

  onSubmit() {
    this._loginService.login(this.loginForm.value).subscribe({
      next: (data) => {
        localStorage.setItem("token=", data.token);
        this._router.navigate(['/event']);
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
