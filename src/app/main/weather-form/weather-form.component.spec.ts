import { ReactiveFormsModule } from "@angular/forms";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { WeatherFormComponent } from "./weather-form.component";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("WeatherFormComponent", () => {
  let component: WeatherFormComponent;
  let fixture: ComponentFixture<WeatherFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [WeatherFormComponent],
    imports: [ReactiveFormsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
