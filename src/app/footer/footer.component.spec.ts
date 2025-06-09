import { beforeEach, describe, expect, it } from "vitest";

import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideZonelessChangeDetection } from "@angular/core";
import { FooterComponent } from "./footer.component";

describe("FooterComponent", () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(FooterComponent);
    await fixture.whenStable();
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
