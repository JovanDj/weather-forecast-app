import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FooterComponent } from "./footer/footer.component";
import { MainComponent } from "./main/main.component";
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavbarComponent, MainComponent, FooterComponent],
})
export class AppComponent {}
