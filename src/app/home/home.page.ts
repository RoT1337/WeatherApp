import { Component, OnInit } from '@angular/core';
import { WeatherapiService } from '../weatherapi/weatherapi.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  constructor(private weatherapiService: WeatherapiService) {}

  ngOnInit() {
    //this.weatherapiService.getCurrentLocation();
  }

  get weatherData() {
    return this.weatherapiService.getWeatherData();
  }

  getCurrentLocation() {
    this.weatherapiService.getCurrentLocation();
  }
}