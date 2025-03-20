import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../preferences/preferences.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {
  tempChoice: string = '';
  paletteToggle: boolean = false;

  constructor(private preferenceService: PreferencesService) {}

  ngOnInit() {
    this.getPreference();

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    this.initializeDarkPalette(prefersDark.matches);

    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  }

  async setPreference() {
    console.log(`Temp Label: ${this.tempChoice}, App Theme: ${this.paletteToggle}`);

    await this.preferenceService.setPreferences('settings', {
      tempChoice: this.tempChoice,
      paletteToggle: this.paletteToggle,
    });
  }

  async getPreference() {
    const settings = await this.preferenceService.getPreferences('settings');

    if (settings) {
      this.tempChoice = settings.tempChoice;
      this.paletteToggle = settings.appTheme;
    }
  }

  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  toggleChange(event: CustomEvent) {
    this.toggleDarkPalette(event.detail.checked);
    this.setPreference();
  }

  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }
}
