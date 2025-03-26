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

  async ngOnInit() {
    await this.getPreference();

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.initializeDarkPalette(this.paletteToggle);

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
      this.paletteToggle = settings.paletteToggle; // Ensure this matches the stored preference
    }

    console.log(`Temp Label: ${this.tempChoice}, Dark Mode: ${this.paletteToggle}`);
  }

  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  toggleChange(event: CustomEvent) {
    this.paletteToggle = event.detail.checked; // Update the component's state
    this.toggleDarkPalette(this.paletteToggle);
    this.setPreference();
  }

  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }
}