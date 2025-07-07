import { beforeEach, describe, expect, it } from "vitest";

import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideHttpClient } from "@angular/common/http";
import { provideZonelessChangeDetection } from "@angular/core";
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
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        WeatherService,
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(MainComponent);

    await fixture.whenStable();
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
