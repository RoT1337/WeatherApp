import { Component, OnInit } from '@angular/core';
import { WeatherapiService } from '../weatherapi/weatherapi.service';

@Component({
  selector: 'app-dailyforecasts',
  templateUrl: './dailyforecasts.page.html',
  styleUrls: ['./dailyforecasts.page.scss'],
  standalone: false,
})
export class DailyforecastsPage implements OnInit {

  constructor(private weatherapiService: WeatherapiService) { }

  ngOnInit() {
  }

  get weatherData() {
    return this.weatherapiService.getWeatherData();
  }

}
