import { beforeEach, describe, expect, it } from "vitest";

import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { provideZonelessChangeDetection } from "@angular/core";
import { WeatherService } from "./weather.service";

describe("WeatherService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
      ],
    }),
  );

  it("should be created", () => {
    const service: WeatherService = TestBed.inject(WeatherService);
    expect(service).toBeTruthy();
  });
});
