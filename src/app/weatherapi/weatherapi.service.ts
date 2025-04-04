import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeolocationService } from '../geolocation/geolocation.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherapiService {
  private locationKey: any;
  private weatherData: any = {};
  private hourlyWeatherData: any[] = [];
  private locationsArray: any[] = [];

  constructor(
    private http: HttpClient,
    private geolocationService: GeolocationService
  ) {}

  async getCurrentLocation() {
    const currentCoordinates = await this.geolocationService.getCurrentLocation();
    if (!currentCoordinates) {
      console.error('Failed to get current location');
      return;
    }
    const latitude = currentCoordinates.latitude;
    const longitude = currentCoordinates.longitude;

    console.log(`Latitude: ${latitude} & Longitude: ${longitude}`);

    this.http.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${environment.apiKey}&q=${latitude}%2C${longitude}`).subscribe(
      (data: any) => {
        this.weatherData.englishName = data.EnglishName;
        this.weatherData.adminName = data.AdministrativeArea.EnglishName;
        this.locationKey = data.Key;

        console.log(`Key for ${this.weatherData.englishName}, ${this.weatherData.adminName} : ${this.locationKey}`);

        this.getWeatherConditions(this.locationKey);
        this.getForecast5Days(this.locationKey);
        this.getHourlyUpdates(this.locationKey);
      }
    );
  }

  getLocationDetails(locKey: string) {
    this.http.get(`http://dataservice.accuweather.com/locations/v1/${locKey}?apikey=${environment.apiKey}`).subscribe(
      (data: any) => {
        this.weatherData.englishName = data.EnglishName;
        this.weatherData.adminName = data.AdministrativeArea.EnglishName;

        this.getWeatherConditions(locKey);
        this.getForecast5Days(locKey);
        this.getHourlyUpdates(locKey);
      }
    );
  }

  private getWeatherConditions(locKey: string) {
    this.http.get(`http://dataservice.accuweather.com/currentconditions/v1/${locKey}?apikey=${environment.apiKey}&details=true`).subscribe(
      (data: any) => {
        this.weatherData.weatherIcon = data[0].WeatherIcon;
        this.weatherData.weatherType = data[0].WeatherText.toLowerCase();
        this.weatherData.temperatureMetric = data[0].Temperature.Metric.Value;
        this.weatherData.temperatureImperial = data[0].Temperature.Imperial.Value;
        this.weatherData.humidity = data[0].RelativeHumidity;
        this.weatherData.realfeelTempMetric = data[0].RealFeelTemperature.Metric.Value;
        this.weatherData.realfeelPhraseMetric = data[0].RealFeelTemperature.Metric.Phrase.toLowerCase();
        this.weatherData.realfeelTempImperial = data[0].RealFeelTemperature.Imperial.Value;
        this.weatherData.realfeelPhraseImperial = data[0].RealFeelTemperature.Imperial.Phrase.toLowerCase();
        this.weatherData.realFeelShadeTempMetric = data[0].RealFeelTemperatureShade.Metric.Value;
        this.weatherData.realFeelShadeTempImperial = data[0].RealFeelTemperatureShade.Imperial.Value;
        this.weatherData.uvIndexNum = data[0].UVIndex;
        this.weatherData.uvIndexText = data[0].UVIndexText;
        this.weatherData.windDirection = data[0].Wind.Direction.English;
        this.weatherData.windSpeed = data[0].Wind.Speed.Metric.Value;

        console.log(`Weather: ${this.weatherData.weatherType}, 
          Temperature: ${this.weatherData.temperatureMetric} °C, 
          RealFeel®: ${this.weatherData.realfeelTempMetric} °C, 
          RealFeelShade®: ${this.weatherData.realFeelShadeTempMetric} °C,
          UV Index: ${this.weatherData.uvIndexNum} ${this.weatherData.uvIndexText}, 
          Wind: ${this.weatherData.windDirection} ${this.weatherData.windSpeed}`);
      }
    );
  }

  private getForecast5Days(locKey: string) {
    this.http.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locKey}?apikey=${environment.apiKey}&metric=true`).subscribe(
      (data: any) => {
        this.weatherData.forecastHeadline = data.Headline.Text;
        this.weatherData.forecastStart = data.Headline.EffectiveEpochDate;
        this.weatherData.forecastEnd = data.Headline.EndDate;
        this.weatherData.dailyForecasts = data.DailyForecasts;
        console.log(this.weatherData.dailyForecasts);
      }
    );
  }

  private getHourlyUpdates(locKey: string) {
    this.http.get(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locKey}?apikey=${environment.apiKey}&metric=true`).subscribe(
      (data: any) => {
        this.hourlyWeatherData = data;
        console.log(this.weatherData.hourForecast);
      }
    );
  }

  getAutoCompleteLocations(q: string) {
    console.log(`Received: ${q}`)
    this.http.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${environment.apiKey}&q=${q}`).subscribe(
      (data: any) => {
        this.locationsArray = data;
        console.log(this.locationsArray);
      },
      (error) => {
        console.error('Error fetching autocomplete locations');
      }
    );

    return this.locationsArray;
  }

  getWeatherData() {
    return this.weatherData;
  }

  getHourlyWeatherData() {
    return this.hourlyWeatherData;
  }
}