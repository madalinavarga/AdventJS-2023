import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Wish, WishCreate } from '../models/Wish';

@Injectable({
  providedIn: 'root'
})
export class WishApiService {
  httpClient = inject(HttpClient)
  baseUrl = environment.apiURL + 'wishlist'

  create(wishlist: WishCreate[]) {
    return this.httpClient.post<any>(this.baseUrl, wishlist);
  }

  get(userId?: string) {
    const options = userId ?
      { params: new HttpParams().set('id', userId) } : {};

    return this.httpClient.get<Wish>(this.baseUrl, options);
  }
}
