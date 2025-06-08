import { NgModule } from "@angular/core";
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from "@angular/material/legacy-autocomplete";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatLegacyCardModule as MatCardModule } from "@angular/material/legacy-card";
import { MatLegacyChipsModule as MatChipsModule } from "@angular/material/legacy-chips";
import { MatRippleModule } from "@angular/material/core";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacyListModule as MatListModule } from "@angular/material/legacy-list";
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from "@angular/material/legacy-progress-spinner";
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatLegacyTooltipModule as MatTooltipModule } from "@angular/material/legacy-tooltip";

@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
    MatChipsModule,
    MatRippleModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
    MatRippleModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {}
