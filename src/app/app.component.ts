import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  // constructor(private swUpdate: SwUpdate) {}
  // ngOnInit(): void {
  //   if (this.swUpdate.isEnabled) {
  //     this.swUpdate.available.subscribe(() => {
  //       if (confirm("New version available. Load New Version?")) {
  //         window.location.reload();
  //       }
  //     });
  //   }
  // }
}
