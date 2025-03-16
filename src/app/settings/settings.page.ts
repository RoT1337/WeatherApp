import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {
  tempChoice: string = '';
  appTheme: string = '';

  constructor() {}

  ngOnInit() {
    this.getPreference();
  }

  async setPreference() {
    console.log(`Temp Label: ${this.tempChoice}, App Theme: ${this.appTheme}`);

    await Preferences.set({
      key: 'settings',
      value: JSON.stringify({
        tempChoice: this.tempChoice,
        appTheme: this.appTheme,
      })
    });
  }

  async getPreference() {
    const result = await Preferences.get({ key: 'settings' });

    if (result.value) {
      const settings = JSON.parse(result.value);
      this.tempChoice = settings.tempChoice;
      this.appTheme = settings.appTheme;
    }
  }
}
