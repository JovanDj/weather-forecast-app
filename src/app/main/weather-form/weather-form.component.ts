import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";

import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-weather-form",
  templateUrl: "./weather-form.component.html",
  styleUrls: ["./weather-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
})
export class WeatherFormComponent {
  @Input()
  locationDetected = false;

  @Input()
  error = "";

  @Input()
  loading = false;

  @Input()
  locationDetectedMessage = "";

  @Output()
  locationButtonClick = new EventEmitter();

  @Output()
  errorMessageClick = new EventEmitter();

  onLocationButtonClick() {
    this.locationButtonClick.emit();
  }

  onErrorMessageClick() {
    this.errorMessageClick.emit();
  }
}
