import { CityOption } from './../models/city-option.model';
import { CurrentWeather } from './../models/current-weather.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private currentUrl = `https://api.apixu.com/v1/current.json?key=${
    environment.apiKey
  }`;
  private searchUrl = `https://api.apixu.com/v1/search.json?key=${
    environment.apiKey
  }`;

  private readonly weatherSubject = new Subject<CurrentWeather>();

  weather$ = this.weatherSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCurrentWeather(q: string): void {
    let params: HttpParams = new HttpParams();

    params = params.set('q', q);
    this.http
      .get<CurrentWeather>(this.currentUrl, { params })
      .subscribe((weather: CurrentWeather) => {
        this.weatherSubject.next(weather);
      });
  }

  getCityOptions(q: string): Observable<CityOption[]> {
    let params: HttpParams = new HttpParams();

    params = params.set('q', q);

    return this.http.get<CityOption[]>(this.searchUrl, { params });
  }
}
