import { Component, OnInit } from '@angular/core';
import { WeatherapiService } from '../weatherapi/weatherapi.service';
import { PreferencesService } from '../preferences/preferences.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  tempChoice: string = 'Celsius';
  isSearchOverlayVisible: boolean = false;
  searchQuery: string = '';
  locationsArray: any[] = [];

  constructor(
    private weatherapiService: WeatherapiService,
    private preferencesService: PreferencesService,
  ) {}

  async ngOnInit() {
    await this.getTempPreference();
    //this.weatherapiService.getCurrentLocation();
  }

  async getTempPreference() {
    const settings = await this.preferencesService.getPreferences('settings');
    if (settings && settings.tempChoice) {
      this.tempChoice = settings.tempChoice;
    }
  }

  get weatherData() {
    return this.weatherapiService.getWeatherData();
  }

  get hourlyWeatherData() {
    return this.weatherapiService.getHourlyWeatherData();
  }

  getCurrentLocation() {
    this.weatherapiService.getCurrentLocation();

    this.isSearchOverlayVisible = false;
  }

  toggleSearchOverlay() {
    console.log('Backdrop Clicked');
    this.isSearchOverlayVisible = !this.isSearchOverlayVisible;
  }

  async onSearchChange(event: any) {
    const query = event.target.value;
    console.log(query);
    this.locationsArray = await this.weatherapiService.getAutoCompleteLocations(query);
  }

  selectLocation(locationKey: string) {
    console.log('Selected Location Key:', locationKey);
    this.weatherapiService.getLocationDetails(locationKey);
    
    this.isSearchOverlayVisible = false;
  }

  convertEpochToHour(epoch: number): string {
    const date = new Date(epoch * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });;
  }

  convertEpochToOnlyDate(epoch: number): string {
    const date = new Date(epoch * 1000);
    return date.toLocaleDateString();
  }

  convertEpochToDay(epoch: number): string {
    const date = new Date(epoch * 1000); 
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()]; 
  }
}