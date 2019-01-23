import { Sys } from './sys.model';
import { Clouds } from './clouds.model';
import { Main } from './main.model';
import { WeatherElement } from './weather-element.model';
import { Coord } from './coord.model';
import { Wind } from './wind.model';

export interface Weather {
  coord: Coord;
  weather: WeatherElement[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  id: number;
  name: string;
  cod: number;
}
