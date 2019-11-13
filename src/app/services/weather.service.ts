import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {
  distinctUntilChanged,
  finalize,
  map,
  shareReplay,
  tap
} from "rxjs/operators";
import { environment } from "src/environments/environment";
import { API } from "../models/current.model";

export interface State {
  api: API;
  loading: boolean;
  loaded: boolean;
}

let _state: State = {
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
      wind_speed: 0
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
      utc_offset: ""
    },
    request: {
      language: "",
      query: "",
      type: "",
      unit: ""
    }
  },
  loading: false,
  loaded: false
};

@Injectable({
  providedIn: "root"
})
export class WeatherService {
  private currentUrl = `http://api.weatherstack.com/current?access_key=${environment.apiKey}`;

  private store = new BehaviorSubject<State>(_state);
  private state$ = this.store.asObservable();

  constructor(private http: HttpClient) {
    this.state$.subscribe(state => console.log(state));
  }

  loading$ = this.state$.pipe(
    map(state => {
      return state.loading;
    }),
    distinctUntilChanged(),
    shareReplay()
  );

  loaded$ = this.state$.pipe(
    map(state => {
      return state.loaded;
    }),
    distinctUntilChanged(),
    shareReplay()
  );

  api$ = this.state$.pipe(
    map(state => {
      return state.api;
    }),
    distinctUntilChanged(),
    shareReplay()
  );

  getCurrentWeather(q: string): void {
    let params: HttpParams = new HttpParams();

    params = params.set("query", q);

    this.updateLoading(true);

    this.http
      .get<API>(this.currentUrl, { params })
      .pipe(
        tap((api: API) => {
          this.updateState(api, false, true);
        }),
        finalize(() => {
          this.updateLoading(false);
        })
      )
      .subscribe();
  }

  private updateState(api: API, loading: boolean, loaded: boolean) {
    this.updateStore({ ..._state, api, loading, loaded });
  }

  private updateLoading(loading: boolean) {
    this.updateStore({ ..._state, loading });
  }

  private updateStore(state: State) {
    this.store.next((_state = state));
  }
}
