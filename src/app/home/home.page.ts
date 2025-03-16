import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../geolocation/geolocation.service';
import { HttpClient } from '@angular/common/http';

const API_KEY: string = 'gGHWaROxc1GObxSwZAbApoyXKAy5GK4d';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit{

  currentCoordinates: any;
  latitude: number = 0;
  longitude: number = 0;

  englishName: string = 'Mep';
  adminName: string = 'Mep';
  keyForLocation: string = '';

  weatherType: string = '';
  temperatureMetric: number | null = 0;
  temperatureImperial: number | null= 0;
  humidity: number | null = 0;
  realfeelTempMetric: number = 0;
  realfeelTempImperial: number = 0;
  realFeelShadeTempMetric: number = 0;
  realFeelShadeTempImperial: number = 0;
  uvIndexNum: number | null = 0;
  uvIndexText: string = '';
  windDirection: string = '';
  windSpeed: number = 0; 

  constructor(
    private geolocationService: GeolocationService,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    // this.getCurrentLocation();
  }

  async getCurrentLocation() {
    this.currentCoordinates = await this.geolocationService.getCurrentLocation();

    this.latitude = this.currentCoordinates.latitude;
    this.longitude = this.currentCoordinates.longitude;

    console.log(`Latitude: ${this.latitude} & Longitude: ${this.longitude}`);
  
    this.http.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${this.latitude}%2C${this.longitude}`).subscribe(
      (data: any) => {
        this.englishName = data.EnglishName;
        this.adminName = data.AdministrativeArea.EnglishName;
        this.keyForLocation = data.Key;

        console.log(`Key for ${this.englishName}, ${this.adminName} : ${this.keyForLocation}`);

        this.getWeatherConditions();
      }
    );
  }

  getWeatherConditions() {
    this.http.get(`http://dataservice.accuweather.com/currentconditions/v1/${this.keyForLocation}?apikey=${API_KEY}&details=true`).subscribe(
      (data: any) => {
        this.weatherType = data[0].WeatherText;
        this.temperatureMetric = data[0].Temperature.Metric.Value;
        this.temperatureImperial = data[0].Temperature.Imperial.Value;
        this.humidity = data[0].RelativeHumidity;
        this.realfeelTempMetric = data[0].RealFeelTemperature.Metric.Value;
        this.realfeelTempImperial = data[0].RealFeelTemperature.Imperial.Value;
        this.realFeelShadeTempMetric = data[0].RealFeelTemperatureShade.Metric.Value;
        this.realFeelShadeTempImperial = data[0].RealFeelTemperatureShade.Imperial.Value;
        this.uvIndexNum = data[0].UVIndex;
        this.uvIndexText = data[0].UVIndexText;
        this.windDirection = data[0].Wind.Direction.English;
        this.windSpeed = data[0].Wind.Speed.Metric.Value;

        console.log(`Weather: ${this.weatherType}, 
          Temperature: ${this.temperatureMetric} °C, 
          RealFeel®: ${this.realfeelTempMetric} °C, 
          RealFeelShade®: ${this.realFeelShadeTempMetric} °C,
          UV Index: ${this.uvIndexNum} ${this.uvIndexText}, 
          Wind: ${this.windDirection} ${this.windSpeed}`);
      }
    );
  }
}
