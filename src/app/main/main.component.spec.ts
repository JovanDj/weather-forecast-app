import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { WeatherService } from "../services/weather.service";
import { MainComponent } from "./main.component";
import { WeatherFormComponent } from "./weather-form/weather-form.component";

describe("MainComponent", () => {
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MainComponent, WeatherFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        WeatherService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    fixture.autoDetectChanges();
  });

  it("shows default detect location button text", () => {
    const locationButton = fixture.debugElement.query(
      By.css(".weather button"),
    );
    const nativeElement: HTMLElement = locationButton.nativeElement;

    expect(nativeElement.textContent).toContain("Detect location");
  });
});
