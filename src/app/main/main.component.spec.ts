import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideHttpClient } from "@angular/common/http";
import { By } from "@angular/platform-browser";
import { WeatherService } from "../services/weather.service";
import { MainComponent } from "./main.component";
import { WeatherFormComponent } from "./weather-form/weather-form.component";

describe("MainComponent", () => {
  let component: MainComponent;
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

  beforeEach(async () => {
    fixture = TestBed.createComponent(MainComponent);
    fixture.autoDetectChanges();

    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("shows default detect location button text", () => {
    const locationButton = fixture.debugElement.query(
      By.css(".weather button"),
    );
    const nativeElement: HTMLElement = locationButton.nativeElement;

    expect(nativeElement.textContent).toContain("Detect location");
  });
});
