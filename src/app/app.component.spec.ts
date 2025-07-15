import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it("should create the app", async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.autoDetectChanges();

    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
