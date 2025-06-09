import { beforeEach, describe, expect, it } from "vitest";

import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideZonelessChangeDetection } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();
  });

  it("should create the app", async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();

    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
