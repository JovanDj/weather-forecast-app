import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {}
