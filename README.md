# Movie Studio App

A React Native mobile application for browsing and discovering movies using the TMDB API.

## Features

- Browse trending and popular movies
- Search for movies by title
- View movie details including cast, crew, and trailers
- User authentication with email/password and Google Sign-In
- Profile management
- Responsive UI for both iOS and Android

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/MRUMAR85/Movie-Studio.git
   cd Movie-Studio
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Environment Configuration:
   
   Create a `.env` file in the root directory with the following variables:
   ```
   # Firebase Configuration
   FIREBASE_API_KEY=your-api-key
   FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   FIREBASE_APP_ID=your-app-id

   # TMDB API Configuration
   TMDB_API_KEY=your-tmdb-api-key
   TMDB_API_TOKEN=your-tmdb-api-token
   TMDB_API_BASE_URL=https://api.themoviedb.org/3
   TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/

   # Google OAuth Configuration
   GOOGLE_WEB_CLIENT_ID=your-google-web-client-id
   GOOGLE_IOS_CLIENT_ID=your-google-ios-client-id
   GOOGLE_ANDROID_CLIENT_ID=your-google-android-client-id
   ```

   You'll need to create accounts and get API keys from:
   - [Firebase](https://firebase.google.com/)
   - [TMDB (The Movie Database)](https://www.themoviedb.org/documentation/api)
   - [Google Cloud Console](https://console.cloud.google.com/) (for OAuth)

### Running the App

1. Start the development server:
   ```
   npm start
   ```

2. Use the Expo Go app on your mobile device to scan the QR code, or run on an emulator.

## Building for Production

### Android

1. Build the Android APK:
   ```
   expo build:android -t apk
   ```

2. For an Android App Bundle (AAB):
   ```
   expo build:android -t app-bundle
   ```

### iOS

1. Build for iOS:
   ```
   expo build:ios
   ```

## Project Structure

- `/assets` - Images and static assets
- `/src`
  - `/components` - Reusable UI components
  - `/navigation` - Navigation configuration
  - `/screens` - App screens
  - `/utils` - Utility functions and services

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

see the LICENSE file for details.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [Expo](https://expo.dev/) for the development framework
- [Firebase](https://firebase.google.com/) for authentication services 
