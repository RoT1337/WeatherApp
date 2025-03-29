import { Component, OnInit } from '@angular/core';
import { WeatherapiService } from '../weatherapi/weatherapi.service';

@Component({
  selector: 'app-hourlyupdates',
  templateUrl: './hourlyupdates.page.html',
  styleUrls: ['./hourlyupdates.page.scss'],
  standalone: false
})
export class HourlyupdatesPage implements OnInit {

  constructor(private weatherapiService: WeatherapiService) { }

  ngOnInit() {
  }

  get hourlyWeatherData() {
    return this.weatherapiService.getHourlyWeatherData();
  }

  convertEpochToDate(epoch: number): string {
    const date = new Date(epoch * 1000);
    return date.toLocaleString();
  }

}
