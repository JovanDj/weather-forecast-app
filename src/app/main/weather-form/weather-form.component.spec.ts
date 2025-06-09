import { beforeEach, describe, expect, it } from "vitest";

import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideHttpClient } from "@angular/common/http";
import { provideZonelessChangeDetection } from "@angular/core";
import { WeatherFormComponent } from "./weather-form.component";

describe("WeatherFormComponent", () => {
  let component: WeatherFormComponent;
  let fixture: ComponentFixture<WeatherFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WeatherFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(WeatherFormComponent);
    await fixture.whenStable();
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
