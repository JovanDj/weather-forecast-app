import { Component } from '@angular/core';
import { CurrentWeather } from '../models/current-weather.model';
import { Observable } from 'rxjs';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  currentWeather$: Observable<CurrentWeather>;

  constructor(private weatherService: WeatherService) {
    this.currentWeather$ = this.weatherService.weather$;
  }

  // private changeBackground(): void {
  //   if (this.currentWeather.current.is_day === 1) {
  //     this.renderer.removeStyle(document.body, 'background-image');
  //     this.renderer.setStyle(
  //       document.body,
  //       'background-image',
  //       'url("assets/day.png")'
  //     );
  //     this.renderer.setStyle(document.body, 'color', '#000');
  //   } else {
  //     this.renderer.removeStyle(document.body, 'background-image');
  //     this.renderer.setStyle(
  //       document.body,
  //       'background-image',
  //       'url("assets/night.png")'
  //     );
  //     this.renderer.setStyle(document.body, 'color', '#000');
  //   }
  // }
}
