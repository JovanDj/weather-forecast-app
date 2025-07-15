import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FooterComponent } from "./footer.component";

describe("FooterComponent", () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(FooterComponent);
    fixture.autoDetectChanges();

    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
