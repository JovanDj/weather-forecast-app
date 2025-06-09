import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatToolbarModule]
})
export class FooterComponent {}
