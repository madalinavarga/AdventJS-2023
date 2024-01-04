import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { InvitationsResponse, PartialInvitationUpdate } from '../models/InviteResponse';

@Injectable({
  providedIn: 'root'
})
export class InviteApiService {
  baseUrl = environment.apiURL + 'invite';

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<InvitationsResponse[]>(this.baseUrl);
  }

  update(invite: PartialInvitationUpdate,id?: string) {
    console.log("update")
    let url = `${this.baseUrl}/${id}`;
    return this.httpClient.patch<InvitationsResponse>(url, invite);
  }
}
