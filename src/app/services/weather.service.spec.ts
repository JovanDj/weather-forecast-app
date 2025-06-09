import { provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { WeatherService } from "./weather.service";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("WeatherService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
  );

  it("should be created", () => {
    const service: WeatherService = TestBed.inject(WeatherService);
    expect(service).toBeTruthy();
  });
});
