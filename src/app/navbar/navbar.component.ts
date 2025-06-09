import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ["./navbar.component.scss"],
    imports: [MatToolbarModule]
})
export class NavbarComponent {}
