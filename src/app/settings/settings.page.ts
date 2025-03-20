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
    console.log(`Temp Label: ${this.tempChoice}, Dark Mode: ${this.paletteToggle}`);

    await this.preferenceService.setPreferences('settings', {
      tempChoice: this.tempChoice,
      paletteToggle: this.paletteToggle,
    });
  }

  async getPreference() {
    const settings = await this.preferenceService.getPreferences('settings');

    if (settings) {
      this.tempChoice = settings.tempChoice;
      this.paletteToggle = settings.paletteToggle;
      this.toggleDarkPalette(this.paletteToggle);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.paletteToggle = prefersDark;
      this.toggleDarkPalette(prefersDark);
    }

    console.log(`Temp Label: ${this.tempChoice}, Dark Mode: ${this.paletteToggle}`);
  }
  
  toggleChange(event: CustomEvent) {
    this.toggleDarkPalette(event.detail.checked);
    this.setPreference();
  }

  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }
}