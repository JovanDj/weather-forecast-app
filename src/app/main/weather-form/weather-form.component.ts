import { CityOption } from './../../models/city-option.model';
import { WeatherForm } from './../../models/weather-form.model';
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
  weatherForm: FormGroup;
  @Output() readonly weatherChange = new EventEmitter();
  cityOptions$: Observable<CityOption[]>;
  watchID = 0;
  errorMessage = '';
  loading = false;

  constructor(private weatherService: WeatherService, private fb: FormBuilder) {
    this.cityOptions$ = this.weatherService.cityOptions$;
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
    this.weatherService.getCurrentWeather(weatherForm.q);
    this.weatherChange.emit();
    this.loading = false;
  }

  getCityOptions(weatherForm: WeatherForm): void {
    this.clearWatch();

    if (weatherForm.q.length > 3) {
      this.weatherService.getCityOptions(weatherForm.q);
    }
  }

  getCoords(): void {
    if (navigator.geolocation) {
      this.watchID = navigator.geolocation.watchPosition(
        // Success
        (position: Position) => {
          const q = `${position.coords.latitude},${position.coords.longitude}`;
          this.weatherService.getCurrentWeather(q);
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
    this.weatherService.getCurrentWeather(city);
  }

  ngOnInit(): void {}
}
