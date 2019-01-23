import { CityOption } from './../../models/city-option.model';
import { WeatherForm } from './../../models/weather-form.model';
import { CurrentWeather } from './../../models/current-weather.model';
import { WeatherService } from './../../services/weather.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.scss']
})
export class WeatherFormComponent implements OnInit {
  @Output() weatherReceived = new EventEmitter<CurrentWeather>();
  weatherForm: FormGroup;
  cityOptions!: CityOption[];

  constructor(private weatherService: WeatherService, private fb: FormBuilder) {
    this.weatherForm = this.fb.group({
      q: ['', Validators.maxLength(20)]
    });
  }

  getCurrentWeather(weatherForm: WeatherForm): void {
    this.weatherService.getCurrentWeather(weatherForm.q).subscribe((currentWeather: CurrentWeather) => {
      this.weatherReceived.emit(currentWeather);
    });
  }

  getCityOptions(weatherForm: WeatherForm): void {
    if (weatherForm.q.length > 3) {
      this.weatherForm.valueChanges.pipe(
        debounceTime(2000),
        distinctUntilChanged()
      );
      this.weatherService.getCityOptions(weatherForm.q).subscribe((cityOptions: CityOption[]) => {
        this.cityOptions = cityOptions;
      });
    }
  }

  selectCity(city: string): void {
    this.weatherForm.setValue({ q: city });
  }

  ngOnInit(): void {}
}
