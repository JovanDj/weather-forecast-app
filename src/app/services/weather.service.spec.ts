import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import "zone.js/testing";
import { API } from "../models/current.model";
import { State, WeatherService } from "./weather.service";

describe("WeatherService", () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(WeatherService);
  });

  it("should initialize default values", () => {
    const initialState: State = {
      api: {
        current: {
          cloudcover: 0,
          feelslike: 0,
          humidity: 0,
          is_day: "",
          observation_time: "",
          precip: 0,
          pressure: 0,
          temperature: 0,
          uv_index: 0,
          visibility: 0,
          weather_code: 0,
          weather_descriptions: [],
          weather_icons: [],
          wind_degree: 0,
          wind_dir: "",
          wind_speed: 0,
        },
        location: {
          country: "",
          lat: "",
          localtime: "",
          localtime_epoch: 0,
          lon: "",
          name: "",
          region: "",
          timezone_id: "",
          utc_offset: "",
        },
        request: {
          language: "",
          query: "",
          type: "",
          unit: "",
        },
      },
      loading: false,
      loaded: false,
      locationDetected: false,
      error: "",
    };

    expect(service.weather()).toEqual({
      ...initialState,
      locationDetectedMessage: "Detect location",
      locationWiki: "",
    });
  });

  it("should return empty locationWiki when location name is empty", () => {
    service.weather().api.location.name = "";
    expect(service.weather().locationWiki).toEqual("");
  });

  it("should update error message on clearErrorMessage()", async () => {
    const spy = spyOn(navigator.geolocation, "getCurrentPosition").and.callFake(
      (_: PositionCallback, error?: PositionErrorCallback) => {
        const positionError: GeolocationPositionError = {
          message: "Permission denied",
          code: 0,
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
        };

        if (error) {
          error(positionError);
        }
      },
    );

    service.detectLocation();
    expect(service.weather().error).toBe("Permission denied");

    service.clearErrorMessage();
    expect(service.weather().error).toBe("");

    spy.calls.reset();
  });

  it("should detect location and fetch weather data", () => {
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

    const geoSpy = spyOn(
      navigator.geolocation,
      "getCurrentPosition",
    ).and.callFake((success) => {
      success(mockPosition);
    });

    const fakeResponse: API = {
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

    const updatedWeather = service.weather();

    expect(updatedWeather.api.location.country).toBe("Serbia");
    expect(updatedWeather.locationDetected).toBe(true);
    expect(updatedWeather.loaded).toBe(true);
    expect(updatedWeather.locationWiki).toBe(
      "https://en.wikipedia.org/wiki/Belgrade",
    );
    expect(updatedWeather.locationDetectedMessage).toEqual(
      "Location detected!",
    );
    expect(updatedWeather.loading).toBeFalse();

    geoSpy.calls.reset();
  });
});
