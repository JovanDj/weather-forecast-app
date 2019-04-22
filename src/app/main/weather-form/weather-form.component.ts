import { CityOption } from './../../models/city-option.model';
import { WeatherForm } from './../../models/weather-form.model';
import { CurrentWeather } from './../../models/current-weather.model';
import { WeatherService } from './../../services/weather.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.scss']
})
export class WeatherFormComponent implements OnInit {
  @Output() weatherReceived = new EventEmitter<CurrentWeather>();
  weatherForm: FormGroup;
  cityOptions!: Observable<CityOption[]>;
  watchID = 0;
  errorMessage = '';
  loading = false;

  constructor(private weatherService: WeatherService, private fb: FormBuilder) {
    this.weatherForm = this.fb.group({
      q: [
        '',
        Validators.compose([
          Validators.maxLength(60),
          Validators.required,
          Validators.minLength(3)
        ])
      ]
    });
  }

  getCurrentWeather(weatherForm: WeatherForm): void {
    this.loading = true;
    this.weatherService
      .getCurrentWeather(weatherForm.q)
      .subscribe((currentWeather: CurrentWeather) => {
        this.weatherReceived.emit(currentWeather);
        this.loading = false;
      });
  }

  getCityOptions(weatherForm: WeatherForm): void {
    this.clearWatch();

    if (weatherForm.q.length > 3) {
      this.cityOptions = this.weatherService.getCityOptions(weatherForm.q);
    }
  }

  getCoords(): void {
    if (navigator.geolocation) {
      this.watchID = navigator.geolocation.watchPosition(
        // Success
        (position: Position) => {
          const q = `${position.coords.latitude},${position.coords.longitude}`;
          this.weatherService
            .getCurrentWeather(q)
            .subscribe((currentWeather: CurrentWeather) => {
              this.weatherReceived.emit(currentWeather);
            });
        },

        // Error
        (err: PositionError) => {
          this.errorMessage = err.message;
        },
        { enableHighAccuracy: true }
      );
    } else {
      this.errorMessage = 'Geolocation is not supported by this browser.';
    }
  }

  clearWatch(): void {
    navigator.geolocation.clearWatch(this.watchID);
    this.watchID = 0;
  }

  selectCity(city: string): void {
    this.weatherForm.setValue({ q: city });
  }

  ngOnInit(): void {}
}
