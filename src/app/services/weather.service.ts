import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { API } from '../models/current.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private currentUrl = `http://api.weatherstack.com/current?access_key=${environment.apiKey}`;

  private weatherSubject = new Subject<API>();
  weather$ = this.weatherSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCurrentWeather(q: string): void {
    let params: HttpParams = new HttpParams();

    params = params.set('query', q);
    this.http
      .get<API>(this.currentUrl, { params })
      .subscribe((weather: API) => {
        this.weatherSubject.next(weather);
      });
  }
}
