import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { WeatherFormComponent } from "./weather-form/weather-form.component";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { MainComponent } from "./main.component";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("MainComponent", () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [MainComponent, WeatherFormComponent],
    imports: [ReactiveFormsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
