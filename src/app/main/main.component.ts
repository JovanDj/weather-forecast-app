import { Component, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { CurrentWeather } from '../models/current-weather.model';
import { Observable } from 'rxjs';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  currentWeather$: Observable<CurrentWeather>;

  constructor(
    private weatherService: WeatherService,
    private renderer: Renderer2
  ) {
    this.currentWeather$ = this.weatherService.weather$;

    this.currentWeather$.subscribe((currentWeather: CurrentWeather) => {
      this.changeBackground(currentWeather);
    });
  }

  private changeBackground(currentWeather: CurrentWeather): void {
    if (currentWeather.current.is_day === 1) {
      this.renderer.removeStyle(document.body, 'background-image');
      this.renderer.setStyle(
        document.body,
        'background-image',
        'url("assets/day.png")'
      );
      this.renderer.setStyle(document.body, 'color', '#000');
    } else {
      this.renderer.removeStyle(document.body, 'background-image');
      this.renderer.setStyle(
        document.body,
        'background-image',
        'url("assets/night.png")'
      );
      this.renderer.setStyle(document.body, 'color', '#000');
    }
  }
}
