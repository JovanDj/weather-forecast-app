import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from "@angular/core";

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-weather-form",
  templateUrl: "./weather-form.component.html",
  styleUrls: ["./weather-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatProgressSpinnerModule],
})
export class WeatherFormComponent {
  locationDetected = input(false, { transform: booleanAttribute });
  error = input("");
  loading = input(false, { transform: booleanAttribute });
  locationDetectedMessage = input("");

  locationButtonClick = output();
  errorMessageClick = output();

  onLocationButtonClick() {
    this.locationButtonClick.emit();
  }

  onErrorMessageClick() {
    this.errorMessageClick.emit();
  }
}
