import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideHttpClient } from "@angular/common/http";
import { WeatherFormComponent } from "./weather-form.component";

describe("WeatherFormComponent", () => {
  let component: WeatherFormComponent;
  let fixture: ComponentFixture<WeatherFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WeatherFormComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(WeatherFormComponent);
    fixture.autoDetectChanges();

    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
