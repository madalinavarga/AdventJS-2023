import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { EventRequest } from '../models/EventRequest';
import { EventResponse } from '../models/EventResponse';

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

  get(id: string) {
    return this.httpClient.get<EventResponse>(`${this.baseUrl}/${id}`);
  }
}
