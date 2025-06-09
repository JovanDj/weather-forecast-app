import { beforeEach, describe, expect, it } from "vitest";

import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideZonelessChangeDetection } from "@angular/core";
import { NavbarComponent } from "./navbar.component";

describe("NavbarComponent", () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(NavbarComponent);
    await fixture.whenStable();
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
