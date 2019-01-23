import { Component, OnInit } from '@angular/core';
import { CurrentWeather } from '../models/current-weather.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  currentWeather!: CurrentWeather;

  constructor() {}

  receiveWeather(currentWeather: CurrentWeather): void {
    this.currentWeather = currentWeather;
  }

  ngOnInit(): void {}
}
