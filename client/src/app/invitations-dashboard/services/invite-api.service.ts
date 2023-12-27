import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { InvitationsResponse } from '../models/InviteResponse';

@Injectable({
  providedIn: 'root'
})
export class InviteApiService {
  baseUrl = environment.apiURL + 'invite';

  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get<InvitationsResponse[]>(this.baseUrl);
  }
}
