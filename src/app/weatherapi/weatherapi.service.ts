import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeolocationService } from '../geolocation/geolocation.service';
import { environment } from 'src/environments/environment';
import { SQLiteService } from '../sqlite-service/sqlite.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherapiService {
  private locationKey: any;
  private weatherData: any = {};
  private hourlyWeatherData: any[] = [];
  private locationsArray: any[] = [];

  constructor(
    private http: HttpClient,
    private geolocationService: GeolocationService,
    private sqliteService: SQLiteService
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

    this.http
      .get(
        `${environment.apiUrl}/locations/v1/cities/geoposition/search?apikey=${environment.apiKey2}&q=${latitude}%2C${longitude}`
      )
      .subscribe(
        (data: any) => {
          this.weatherData.englishName = data.EnglishName;
          this.weatherData.adminName = data.AdministrativeArea.EnglishName;
          this.locationKey = data.Key;

          console.log(
            `Key for ${this.weatherData.englishName}, ${this.weatherData.adminName} : ${this.locationKey}`
          );

          this.getWeatherConditions(this.locationKey);
          this.getForecast5Days(this.locationKey);
          this.getHourlyUpdates(this.locationKey);

          this.sqliteService.saveWeatherData(
            this.weatherData.englishName,
            JSON.stringify(this.weatherData)
          );
          this.sqliteService.saveHourlyWeatherData(
            this.weatherData.englishName,
            JSON.stringify(this.hourlyWeatherData)
          );
        },
        async (error) => {
          console.error(`HTTP Error: ${JSON.stringify(error)}`);

          // Try to retrieve cached data from SQLite
          const cachedWeatherData = await this.sqliteService.getWeatherData(
            `${latitude},${longitude}`
          );
          const cachedHourlyData =
            await this.sqliteService.getHourlyWeatherData(
              `${latitude},${longitude}`
            );

          if (cachedWeatherData) {
            console.log('Using cached weather data:', cachedWeatherData);
            this.weatherData = cachedWeatherData;
          } else {
            console.error('No cached weather data available.');
          }

          if (cachedHourlyData) {
            console.log(
              'Using cached hourly weather data:',
              cachedHourlyData
            );
            this.hourlyWeatherData = cachedHourlyData;
          } else {
            console.error('No cached hourly weather data available.');
          }
        }
      );
  }

  getLocationDetails(locKey: string): void {
    this.http
      .get(
        `${environment.apiUrl}/locations/v1/${locKey}?apikey=${environment.apiKey2}`
      )
      .subscribe(
        (data: any) => {
          this.weatherData.englishName = data.EnglishName;
          this.weatherData.adminName = data.AdministrativeArea.EnglishName;

          this.getWeatherConditions(locKey);
          this.getForecast5Days(locKey);
          this.getHourlyUpdates(locKey);

          this.sqliteService.saveWeatherData(
            this.weatherData.englishName,
            JSON.stringify(this.weatherData)
          );
          this.sqliteService.saveHourlyWeatherData(
            this.weatherData.englishName,
            JSON.stringify(this.hourlyWeatherData)
          );

          console.log('Data saved to SQLite successfully.');
        },
        (error) => {
          console.error(
            'Error fetching location details or saving to SQLite:',
            error
          );
        }
      );
  }

  private getWeatherConditions(locKey: string): void {
    this.http
      .get(
        `${environment.apiUrl}/currentconditions/v1/${locKey}?apikey=${environment.apiKey2}&details=true`
      )
      .subscribe(
        (data: any) => {
          this.weatherData.weatherIcon = data[0].WeatherIcon;
          this.weatherData.weatherType = data[0].WeatherText.toLowerCase();
          this.weatherData.temperatureMetric = data[0].Temperature.Metric.Value;
          this.weatherData.temperatureImperial =
            data[0].Temperature.Imperial.Value;
          this.weatherData.humidity = data[0].RelativeHumidity;
          this.weatherData.realfeelTempMetric =
            data[0].RealFeelTemperature.Metric.Value;
          this.weatherData.realfeelPhraseMetric =
            data[0].RealFeelTemperature.Metric.Phrase.toLowerCase();
          this.weatherData.realfeelTempImperial =
            data[0].RealFeelTemperature.Imperial.Value;
          this.weatherData.realfeelPhraseImperial =
            data[0].RealFeelTemperature.Imperial.Phrase.toLowerCase();
          this.weatherData.realFeelShadeTempMetric =
            data[0].RealFeelTemperatureShade.Metric.Value;
          this.weatherData.realFeelShadeTempImperial =
            data[0].RealFeelTemperatureShade.Imperial.Value;
          this.weatherData.uvIndexNum = data[0].UVIndex;
          this.weatherData.uvIndexText = data[0].UVIndexText;
          this.weatherData.windDirection = data[0].Wind.Direction.English;
          this.weatherData.windSpeed = data[0].Wind.Speed.Metric.Value;

          console.log('Weather conditions fetched successfully.');
        },
        (error) => {
          console.error('Error fetching weather conditions:', error);
        }
      );
  }

  private getForecast5Days(locKey: string): void {
    this.http
      .get(
        `${environment.apiUrl}/forecasts/v1/daily/5day/${locKey}?apikey=${environment.apiKey2}&metric=true`
      )
      .subscribe(
        (data: any) => {
          this.weatherData.forecastHeadline = data.Headline.Text;
          this.weatherData.forecastStart = data.Headline.EffectiveEpochDate;
          this.weatherData.forecastEnd = data.Headline.EndDate;
          this.weatherData.dailyForecasts = data.DailyForecasts;

          console.log('5-day forecast fetched successfully.');
        },
        (error) => {
          console.error('Error fetching 5-day forecast:', error);
        }
      );
  }

  private getHourlyUpdates(locKey: string): void {
    this.http
      .get(
        `${environment.apiUrl}/forecasts/v1/hourly/12hour/${locKey}?apikey=${environment.apiKey2}&details=true&metric=true`
      )
      .subscribe(
        (data: any) => {
          this.hourlyWeatherData = data;
          console.log('Hourly updates fetched successfully.');
          
        },
        (error) => {
          console.error('Error fetching hourly updates:', error);
        }
      );
  }

  getAutoCompleteLocations(q: string): any[] {
    console.log(`Received: ${q}`);
    this.http
      .get(
        `${environment.apiUrl}/locations/v1/cities/autocomplete?apikey=${environment.apiKey2}&q=${q}`
      )
      .subscribe(
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