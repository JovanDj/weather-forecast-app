import { CurrentWeather } from './../models/current-weather.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private url = `https://api.apixu.com/v1/current.json?key=${environment.apiKey}`;

  constructor(private http: HttpClient) {}

  getCurrentWeather(q: string): Observable<CurrentWeather> {
    let params: HttpParams = new HttpParams();

    params = params.set('q', q);
    return this.http.get<CurrentWeather>(this.url, { params });
  }
}
