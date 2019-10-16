import { Component, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from '../services/weather.service';
import { API } from '../models/current.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  api$: Observable<API>;

  constructor(
    private weatherService: WeatherService,
    private renderer: Renderer2
  ) {
    this.api$ = this.weatherService.weather$;

    this.api$.subscribe((api: API) => {
      this.changeBackground(api);
    });
  }

  private changeBackground(api: API): void {
    if (api.current.is_day) {
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
