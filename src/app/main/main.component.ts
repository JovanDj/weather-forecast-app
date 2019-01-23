import { Component, OnInit, Renderer2 } from '@angular/core';
import { CurrentWeather } from '../models/current-weather.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  currentWeather!: CurrentWeather;

  constructor(private renderer: Renderer2) {}

  receiveWeather(currentWeather: CurrentWeather): void {
    this.currentWeather = currentWeather;
    this.changeBackground();
  }

  private changeBackground(): void {
    if (this.currentWeather.current.is_day === 1) {
      this.renderer.removeStyle(document.body, 'background-image');
      this.renderer.setStyle(document.body, 'background-image', 'url("../../assets/day.png")');
      this.renderer.setStyle(document.body, 'color', '#000');
    } else {
      this.renderer.removeStyle(document.body, 'background-image');
      this.renderer.setStyle(document.body, 'background-image', 'url("../../assets/night.png")');
      this.renderer.setStyle(document.body, 'color', '#000');
    }
  }

  ngOnInit(): void {}
}
