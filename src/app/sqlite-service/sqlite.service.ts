import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root',
})
export class SQLiteService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async initializeDatabase(): Promise<void> {
    try {
      // Create or open the database
      this.db = await this.sqlite.createConnection('weatherDB', false, 'no-encryption', 1, false);
      await this.db.open();

      // Create tables for storing weather data and hourly updates
      const createWeatherTableQuery = `
        CREATE TABLE IF NOT EXISTS weather (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          location TEXT NOT NULL,
          data TEXT NOT NULL,
          timestamp INTEGER NOT NULL
        );
      `;
      const createHourlyTableQuery = `
        CREATE TABLE IF NOT EXISTS hourly_weather (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          location TEXT NOT NULL,
          data TEXT NOT NULL,
          timestamp INTEGER NOT NULL
        );
      `;

      await this.db.execute(createWeatherTableQuery);
      await this.db.execute(createHourlyTableQuery);
    } catch (error) {
      console.error('Error initializing SQLite database:', error);
    }
  }

  async saveWeatherData(location: string, data: string): Promise<void> {
    if (!this.db) {
      console.error('Database connection is not initialized.');
      return;
    }

    const timestamp = Date.now();
    const insertQuery = `
      INSERT INTO weather (location, data, timestamp)
      VALUES (?, ?, ?);
    `;
    await this.db.run(insertQuery, [location, data, timestamp]);
  }

  async saveHourlyWeatherData(location: string, data: string): Promise<void> {
    if (!this.db) {
      console.error('Database connection is not initialized.');
      return;
    }

    const timestamp = Date.now();
    const insertQuery = `
      INSERT INTO hourly_weather (location, data, timestamp)
      VALUES (?, ?, ?);
    `;
    await this.db.run(insertQuery, [location, data, timestamp]);
  }

  async getWeatherData(location: string): Promise<any> {
    if (!this.db) {
      console.error('Database connection is not initialized.');
      return null;
    }

    const selectQuery = `
      SELECT data FROM weather
      WHERE location = ?
      ORDER BY timestamp DESC
      LIMIT 1;
    `;
    const result = await this.db.query(selectQuery, [location]);
    const values = result.values ?? [];
    return (values.length > 0) ? JSON.parse(values[0].data) : null;
  }

  async getHourlyWeatherData(location: string): Promise<any> {
    if (!this.db) {
      console.error('Database connection is not initialized.');
      return null;
    }

    const selectQuery = `
      SELECT data FROM hourly_weather
      WHERE location = ?
      ORDER BY timestamp DESC
      LIMIT 1;
    `;
    const result = await this.db.query(selectQuery, [location]);
    const values = result.values ?? [];
    return values.length > 0 ? JSON.parse(values[0].data) : null;
  }

  async closeDatabase(): Promise<void> {
    if (this.db) {
      await this.sqlite.closeConnection('weatherDB', false);
      this.db = null;
    }
  }
}