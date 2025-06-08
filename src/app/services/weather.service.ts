import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable, RendererFactory2 } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import {
  distinctUntilChanged,
  finalize,
  map,
  switchMap,
  tap,
} from "rxjs/operators";

import { DOCUMENT } from "@angular/common";
import { environment } from "src/environments/environment";
import { API } from "../models/current.model";

export type State = {
  api: API;
  loading: boolean;
  loaded: boolean;
  locationDetected: boolean;
  error: string;
};

@Injectable({
  providedIn: "root",
})
export class WeatherService {
  readonly #http = inject(HttpClient);
  readonly #renderer = inject(RendererFactory2).createRenderer(null, null);
  readonly #body = inject(DOCUMENT).body;

  readonly #currentUrl = `http://api.weatherstack.com/current?access_key=${environment.apiKey}`;

  readonly #store = new BehaviorSubject<State>({
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
  });

  readonly #state$ = this.#store.asObservable();

  readonly weather$ = this.#state$.pipe(
    map((state) => ({
      loading: state.loading,
      locationDetected: state.locationDetected,
      locationDetectedMessage: state.locationDetected
        ? "Location detected!"
        : "Detect location",
      loaded: state.loaded,
      error: state.error,
      api: state.api,
      locationWiki: `https://en.wikipedia.org/wiki/${state.api.location.name}`,
    })),
    distinctUntilChanged(),
  );

  readonly #detectLocation$ = new Subject<void>();

  constructor() {
    this.#detectLocation$
      .pipe(
        switchMap(() => this.#getCurrentPosition$()),
        switchMap((q) => this.#getCurrentWeather(q)),
        tap((api) => {
          this.#changeBackground(api);
        }),
      )
      .subscribe();
  }

  #getCurrentPosition$() {
    return new Observable<string>((observer) => {
      if (!navigator.geolocation) {
        this.#updateState({
          error: "Geolocation not supported",
          locationDetected: false,
        });
        observer.complete();
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const q = `${position.coords.latitude},${position.coords.longitude}`;
          this.#updateState({ locationDetected: true, loading: true });
          observer.next(q);
          observer.complete();
        },
        (error) => {
          this.#updateState({ error: error.message, locationDetected: false });
          observer.complete();
        },
        { enableHighAccuracy: true },
      );
    });
  }

  detectLocation() {
    this.#detectLocation$.next();
  }

  clearErrorMessage() {
    this.#updateState({ error: "" });
  }

  #getCurrentWeather(q: string) {
    const params = new HttpParams().set("query", q);

    return this.#http.get<API>(this.#currentUrl, { params }).pipe(
      tap((api) => {
        this.#updateState({ api, loaded: true });
      }),
      finalize(() => {
        this.#updateState({ loading: false });
      }),
    );
  }

  #changeBackground(api: API) {
    if (api.current.is_day !== "no") {
      this.#renderer.removeStyle(this.#body, "background-image");
      this.#renderer.setStyle(
        this.#body,
        "background-image",
        'url("assets/day.png")',
      );
      this.#renderer.setStyle(this.#body, "color", "#000");
    } else if (api.current.is_day === "no") {
      this.#renderer.removeStyle(this.#body, "background-image");
      this.#renderer.setStyle(
        this.#body,
        "background-image",
        'url("assets/night.png")',
      );
      this.#renderer.setStyle(this.#body, "color", "#000");
    } else {
      this.#renderer.removeStyle(this.#body, "background-image");
      this.#renderer.setStyle(
        this.#body,
        "background-image",
        'url("assets/clouds.jpg")',
      );
      this.#renderer.setStyle(this.#body, "color", "#000");
    }
  }

  #updateState(state: Partial<State>) {
    this.#store.next({ ...this.#store.getValue(), ...state });
  }
}
