import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../models/RegisterRequest';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegisterApiService {
  baseUrl = environment.apiURL + 'register';

  constructor(private httpClient: HttpClient) { }

  register(details: RegisterRequest) {
    return this.httpClient.post(this.baseUrl, details);
  }
}
