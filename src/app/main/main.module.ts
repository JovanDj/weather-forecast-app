import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { WeatherFormComponent } from './weather-form/weather-form.component';

@NgModule({
  declarations: [MainComponent, WeatherFormComponent],
  imports: [CommonModule, MainRoutingModule, ReactiveFormsModule],
  exports: [MainComponent]
})
export class MainModule {}
