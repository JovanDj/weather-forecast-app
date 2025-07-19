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

  protected locationButtonClick = output();
  protected errorMessageClick = output();

  protected onLocationButtonClick() {
    this.locationButtonClick.emit();
  }

  protected onErrorMessageClick() {
    this.errorMessageClick.emit();
  }
}
