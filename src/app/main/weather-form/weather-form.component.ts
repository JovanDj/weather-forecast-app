import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WeatherForm } from "../../models/weather-form.model";
import { WeatherService } from "./../../services/weather.service";

@Component({
  selector: "app-weather-form",
  templateUrl: "./weather-form.component.html",
  styleUrls: ["./weather-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherFormComponent {
  weatherForm: FormGroup;
  @Output() weatherChange = new EventEmitter();
  errorMessage = "";
  loading = false;
  locationDetected = false;

  constructor(private weatherService: WeatherService, private fb: FormBuilder) {
    this.weatherForm = this.fb.group({
      q: [
        "",
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
    return (position: Position) => {
      const q = `${position.coords.latitude},${position.coords.longitude}`;
      this.locationDetected = true;
      this.weatherService.getCurrentWeather(q);
    };
  }

  private getCurrentPositionError(): PositionErrorCallback | undefined {
    return (err: PositionError) => {
      this.locationDetected = false;

      this.errorMessage = err.message;
    };
  }
}
