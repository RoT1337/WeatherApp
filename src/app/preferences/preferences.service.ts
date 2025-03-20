import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor() { }

  async setPreferences(key: string, value: any): Promise<void> {
    await Preferences.set({
      key: key,
      value: JSON.stringify(value),
    });
  }

  async getPreferences(key: string): Promise<any> {
    const result = await Preferences.get({ key: key });
    return result.value ? JSON.parse(result.value) : null;
  }
}
