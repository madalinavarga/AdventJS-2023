import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { InviteEventRequest } from '../models/InviteEventRequest';
import { EventUsersResponse } from '../models/EventUsersResponse';

@Injectable({
  providedIn: 'root'
})
export class InviteApiService {
  baseUrl = environment.apiURL + 'invite'

  constructor(private httpClient: HttpClient) { }

  createInvite(inviteRequest: InviteEventRequest) {
    return this.httpClient.post(this.baseUrl, inviteRequest);
  }
}
