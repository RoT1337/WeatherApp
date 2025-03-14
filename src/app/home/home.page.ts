import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../geolocation/geolocation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit{
  currentCoordinates: any;

  constructor(private geolocationService: GeolocationService) {}

  ngOnInit() {
    this.getCurrentLocation();
  }

  async getCurrentLocation() {
    this.currentCoordinates = await this.geolocationService.getCurrentLocation();
  }
}
