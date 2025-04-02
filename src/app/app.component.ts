import { Component, OnInit } from '@angular/core';
import { PreferencesService } from './preferences/preferences.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(private preferencesService: PreferencesService) {}

  async ngOnInit() {
    await this.initializeAppPreferences();
  }

  async initializeAppPreferences() {
    const settings = await this.preferencesService.getPreferences('settings');
    if (settings) {
      this.applyPreferences(settings);
    }
  }

  applyPreferences(settings: any) {
    if (settings.paletteToggle) {
      document.documentElement.classList.add('ion-palette-dark');
    } else {
      document.documentElement.classList.remove('ion-palette-dark');
    }
    // Apply other preferences as needed
  }
}
