import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/LoginRequest';
import { environment } from '../../../../environments/environment.development';
import { OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService implements OnInit {

  baseUrl = environment.apiURL + 'login';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

  }

  login(details: LoginRequest) {
    return this.httpClient.post<{token:string}>(this.baseUrl, details);
  }
}
