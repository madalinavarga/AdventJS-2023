import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { EventRequest, EventResponse } from '../models/EventRequest';
import { BaseService } from '../../common/services/base.service';

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
}
