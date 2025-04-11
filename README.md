# A Weather Application

This mobile application project provides weather updates using the AccuWeather API. It offers features such as current weather conditions, 12-hour updates, 5-day forecasts, and the ability to search for weather details by location. The app also supports offline caching of weather data using `@capacitor-community/sqlite`.

---

## Features

- **Current Weather Conditions**: Displays real-time weather details for your location.
- **12-Hour Weather Updates**: Provides hourly weather updates for the next 12 hours.
- **5-Day Weather Forecast**: Displays a 5-day weather forecast with daily high and low temperatures.
- **Location Search**: Manually search for weather details of any location.
- **Automatic Location Detection**: Automatically fetches weather details for your current GPS location.
- **Offline Caching**: Utilizes `@capacitor-community/sqlite` to cache weather data for offline access.
- **User Preferences**:
  - Toggle between Celsius and Fahrenheit.
  - Enable or disable dark mode.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/weatherapp.git
   cd weatherapp

2. Install dependencies:
    npm install

3. Add the Capacitor platforms:
    npx cap add android (if not working, npm install @capacitor/android)

4. Sync the project:
    npx cap sync

5. Run the app:
    ionic serve (for web only)
    npm cap open android (with Android Studio)

---

## Usage

Enable GPS Permissions:
Ensure GPS permissions are enabled for the app to automatically fetch your location's weather details.

Search for a Location:
Tap the icon on the top left to manually search for a location.

View Weather Details:
Access current conditions, 12-hour updates, and 5-day forecasts.

Customize Preferences:
Navigate to the settings page to toggle between Celsius and Fahrenheit or enable dark mode.

--

## Offline Support

WeatherApp uses @capacitor-community/sqlite to cache weather data for offline use. If the app cannot fetch data from the API, it will attempt to load the most recent cached data

--

## Technologies Used
Frontend: Ionic Framework, Angular
Backend API: AccuWeather API
Offline Caching: @capacitor-community/sqlite
Plugins:
@capacitor/app
@capacitor/preferences
@capacitor/geolocation
