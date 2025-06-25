# Movie Studio App

A React Native movie streaming app with Firebase authentication, TMDB movie data integration, and PayPal payment processing.

## Requirements

- Node.js (14.0 or later)
- npm or yarn
- Expo CLI
- Android Studio or Xcode (for running on emulators/simulators)

## Features

- User authentication with email/password and Google Sign-In
- Browse movie catalog with data from TMDB API
- View movie details, cast, and related content
- Search movies by title or category
- Subscription management with PayPal integration

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - The project already includes Firebase configuration files:
     - `GoogleService-Info.plist` for iOS
     - `google-services.json` for Android
   - These files are pre-configured for the app

4. TMDB API:
   - The app uses The Movie Database (TMDB) API
   - A default API key is provided in the config
   - You can replace it with your own API key from [TMDB](https://www.themoviedb.org/settings/api)

5. PayPal Integration:
   - PayPal sandbox configuration is included
   - For production, you'll need to replace the PayPal Client ID in `src/utils/Config.ts`

## Running the App

Start the development server:

```bash
npm start
```

This will open the Expo developer tools. From there, you can:
- Press 'a' to open on an Android emulator
- Press 'i' to open on an iOS simulator
- Scan the QR code with the Expo Go app on your phone

## Build an APK

```bash
npm run build:apk
```

## Project Structure

- `/src/components` - Reusable UI components
- `/src/navigation` - Navigation configuration
- `/src/screens` - App screens
- `/src/utils` - Utility functions and service classes
- `/assets` - Static assets like images

## Working with the Codebase

- Authentication is managed through Firebase services
- Movie data is fetched from TMDB API
- Payment processing uses PayPal sandbox for testing

## License

This project is proprietary and confidential. Unauthorized copying or distribution is prohibited.

## Acknowledgements

- Design inspiration from popular streaming platforms
- Built with Expo and React Native 
 