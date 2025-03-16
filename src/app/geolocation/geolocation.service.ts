import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  async checkPermissions() {
    const permissionStatus = await Geolocation.checkPermissions();
    
    if (permissionStatus.location === 'denied') {
      const newPermissions = await Geolocation.requestPermissions();
    }
  }

  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      return coordinates.coords;
    } catch (error) {
      alert(`Error getting current position ${error}`);
      return;
    }
  }

  watchLocation() {
    Geolocation.watchPosition({}, (position, err) => {
      if (err) {
        alert(`Error watching position ${err}`)
        return;
      }
    });
  }
}
