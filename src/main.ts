import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import {
  enableProdMode,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";

import { AppComponent } from "./app/app.component";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([])),
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
  ],
});
