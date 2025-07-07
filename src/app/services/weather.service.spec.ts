import { beforeEach, describe, expect, it, vi } from "vitest";

import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { provideZonelessChangeDetection } from "@angular/core";
import { WeatherService } from "./weather.service";

describe("WeatherService", { concurrent: true }, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
      ],
    });

    Object.defineProperty(global.navigator, "geolocation", {
      value: {
        getCurrentPosition: vi.fn(),
        watchPosition: vi.fn(),
        clearWatch: vi.fn(),
      },
      configurable: true,
    });
  });

  it("should update error message on clearErrorMessage()", async () => {
    const service = TestBed.inject(WeatherService);

    vi.spyOn(navigator.geolocation, "getCurrentPosition").mockImplementation(
      (_, error) => {
        if (!error) {
          return;
        }

        error({ message: "Permission denied" } as GeolocationPositionError);
      },
    );

    service.detectLocation();
    expect(service.weather().error).toBe("Permission denied");

    service.clearErrorMessage();
    expect(service.weather().error).toBe("");
  });

  it("should detect location and fetch weather data", async () => {
    const service = TestBed.inject(WeatherService);
    const http = TestBed.inject(HttpTestingController);

    const coords: Pick<GeolocationCoordinates, "latitude" | "longitude"> = {
      latitude: 42.0,
      longitude: 21.0,
    };

    const mockPosition: GeolocationPosition = {
      coords: {
        latitude: 42,
        longitude: 21,
        accuracy: 5,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
        toJSON: () => {},
      },
      timestamp: Date.now(),
      toJSON: () => {},
    };

    const geoSpy = vi
      .spyOn(navigator.geolocation, "getCurrentPosition")
      .mockImplementation((success) => {
        success(mockPosition);
      });

    const fakeResponse = {
      current: {
        cloudcover: 50,
        feelslike: 20,
        humidity: 40,
        is_day: "yes",
        observation_time: "",
        precip: 0,
        pressure: 1000,
        temperature: 21,
        uv_index: 5,
        visibility: 10,
        weather_code: 1000,
        weather_descriptions: ["Sunny"],
        weather_icons: [],
        wind_degree: 0,
        wind_dir: "N",
        wind_speed: 0,
      },
      location: {
        country: "Serbia",
        lat: coords.latitude.toString(),
        lon: coords.longitude.toString(),
        localtime: "",
        localtime_epoch: 0,
        name: "Belgrade",
        region: "",
        timezone_id: "",
        utc_offset: "",
      },
      request: {
        language: "en",
        query: "",
        type: "",
        unit: "",
      },
    };

    service.detectLocation();

    const req = http.expectOne(
      (r) =>
        r.method === "GET" &&
        r.url === "http://api.weatherstack.com/current" &&
        r.params.get("query") === `${coords.latitude},${coords.longitude}`,
    );

    req.flush(fakeResponse);

    expect(service.weather().api.location.country).toBe("Serbia");
    expect(service.weather().locationDetected).toBe(true);
    expect(service.weather().loaded).toBe(true);
    expect(service.weather().locationWiki).toBe(
      "https://en.wikipedia.org/wiki/Belgrade",
    );
    expect(service.weather().locationDetectedMessage).toBe(
      "Location detected!",
    );

    geoSpy.mockRestore();
  });
});
