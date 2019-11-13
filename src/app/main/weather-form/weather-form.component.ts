import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { WeatherService } from "./../../services/weather.service";

@Component({
  selector: "app-weather-form",
  templateUrl: "./weather-form.component.html",
  styleUrls: ["./weather-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherFormComponent {
  errorMessage = "";
  loading$ = this.weatherService.loading$;
  locationDetected$ = new BehaviorSubject(false);

  constructor(private weatherService: WeatherService) {}

  getCoords(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.getCurrentPositionSuccess(),
        this.getCurrentPositionError(),
        { enableHighAccuracy: true }
      );
    } else {
      this.errorMessage = "Geolocation is not supported by this browser.";
    }
  }
  private getCurrentPositionSuccess(): PositionCallback {
    return (position: Position): void => {
      const q = `${position.coords.latitude},${position.coords.longitude}`;
      this.locationDetected$.next(true);
      this.weatherService.getCurrentWeather(q);
    };
  }

  private getCurrentPositionError(): PositionErrorCallback | undefined {
    return (err: PositionError): void => {
      this.locationDetected$.next(false);

      this.errorMessage = err.message;
    };
  }
}
