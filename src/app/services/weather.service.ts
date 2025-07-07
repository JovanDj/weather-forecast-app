import { HttpClient, HttpParams } from "@angular/common/http";
import {
  computed,
  DOCUMENT,
  effect,
  inject,
  Injectable,
  RendererFactory2,
  signal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

import { Observable, Subject } from "rxjs";
import { finalize, switchMap, tap } from "rxjs/operators";

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

  readonly #currentUrl = "http://api.weatherstack.com/current";

  readonly #state = signal<State>({
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

  readonly weather = computed(() => {
    const state = this.#state();
    return {
      ...state,
      locationDetectedMessage: state.locationDetected
        ? "Location detected!"
        : "Detect location",
      locationWiki: state.api.location.name
        ? `https://en.wikipedia.org/wiki/${state.api.location.name}`
        : "",
    };
  });

  readonly #detectLocation$ = new Subject<void>();

  constructor() {
    this.#detectLocation$
      .pipe(
        switchMap(() => this.#getCurrentPosition$()),
        switchMap((q) => this.#getCurrentWeather(q)),
        takeUntilDestroyed(),
      )
      .subscribe();

    effect(() => {
      this.#changeBackground(this.#state().api.current.is_day);
    });
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

  #changeBackground(isDay: API["current"]["is_day"]) {
    if (!isDay) {
      return;
    }

    if (isDay !== "no") {
      this.#renderer.setStyle(
        this.#body,
        "background-image",
        'url("assets/day.png")',
      );
      return this.#renderer.setStyle(this.#body, "color", "#000");
    }

    if (isDay === "no") {
      this.#renderer.setStyle(
        this.#body,
        "background-image",
        'url("assets/night.png")',
      );
      return this.#renderer.setStyle(this.#body, "color", "#000");
    }
  }

  #updateState(patch: Partial<State>) {
    this.#state.update((state) => ({ ...state, ...patch }));
  }
}
