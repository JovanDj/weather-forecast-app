import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NavbarComponent } from "./navbar.component";

describe("NavbarComponent", () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavbarComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(NavbarComponent);
    fixture.autoDetectChanges();

    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
