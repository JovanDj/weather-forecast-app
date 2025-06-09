import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";
import { MatListModule } from "@angular/material/list";

import { WeatherService } from "../services/weather.service";
import { WeatherFormComponent } from "./weather-form/weather-form.component";

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        WeatherFormComponent,
        CommonModule,
        MatCardModule,
        MatRippleModule,
        MatListModule,
    ]
})
export class MainComponent {
  readonly #weatherService = inject(WeatherService);
  readonly vm = this.#weatherService.weather;

  onLocationButtonClick() {
    this.#weatherService.detectLocation();
  }

  onErrorMessageClick() {
    this.#weatherService.clearErrorMessage();
  }
}
