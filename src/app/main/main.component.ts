import { ChangeDetectionStrategy, Component, Renderer2 } from "@angular/core";
import { tap } from "rxjs/operators";
import { API } from "../models/current.model";
import { WeatherService } from "../services/weather.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  api$ = this.weatherService.api$;
  loaded$ = this.weatherService.loaded$;
  loading$ = this.weatherService.loading$;

  constructor(
    private weatherService: WeatherService,
    private renderer: Renderer2
  ) {
    this.api$
      .pipe(
        tap((api: API) => {
          this.changeBackground(api);
        })
      )
      .subscribe();
  }

  private changeBackground(api: API): void {
    if (api.current.is_day) {
      this.renderer.removeStyle(document.body, "background-image");
      this.renderer.setStyle(
        document.body,
        "background-image",
        'url("assets/day.png")'
      );
      this.renderer.setStyle(document.body, "color", "#000");
    } else if (api.current.is_day === "") {
      this.renderer.removeStyle(document.body, "background-image");
      this.renderer.setStyle(
        document.body,
        "background-image",
        'url("assets/clouds.jpg")'
      );
      this.renderer.setStyle(document.body, "color", "#000");
    } else {
      this.renderer.removeStyle(document.body, "background-image");
      this.renderer.setStyle(
        document.body,
        "background-image",
        'url("assets/night.png")'
      );
      this.renderer.setStyle(document.body, "color", "#000");
    }
  }
}
