import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  baseUrl = environment.apiURL + 'users'

  constructor(private httpClient: HttpClient) { }
}
