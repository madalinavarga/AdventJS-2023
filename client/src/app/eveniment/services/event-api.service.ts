import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { EventRequest } from '../models/EventRequest';
import { EventResponse } from '../models/EventResponse';
import { EventUsersResponse } from '../models/EventUsersResponse';

@Injectable({
  providedIn: 'root'
})
export class EventApiService {
  baseUrl = environment.apiURL + 'events'

  constructor(private httpClient: HttpClient) {
  }

  create(newEvent: EventRequest) {
    return this.httpClient.post<EventResponse>(this.baseUrl, newEvent);
  }

  update(event: EventRequest, id: string) {
    console.log(id)
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.patch<EventResponse>(url, event);
  }

  get(id: string) {
    return this.httpClient.get<EventResponse>(`${this.baseUrl}/${id}`);
  }

  getUsersFromAnEvent(eventId: string) {
    let url = `${this.baseUrl}/${eventId}/users`
    return this.httpClient.get<EventUsersResponse[]>(url);
  }

  getOwnerEvents(ownerId?: string) {
    if (ownerId === undefined || ownerId == null) {
      return this.httpClient.get<EventResponse[]>(this.baseUrl);
    } else {
      let httpOptions = {
        params: new HttpParams().set('ownerId', ownerId!)
      };
      return this.httpClient.get<EventResponse[]>(this.baseUrl, httpOptions);
    }
  }
}
