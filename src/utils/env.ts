// Environment variables and configuration
// This file should not contain sensitive information directly
// For production, these values should be set in environment variables

// Firebase Configuration
export const FIREBASE_CONFIG = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyC_mV5KbPtIRGGZKvJ-pBZ0xrZvr7JVYyY",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "movie-studio-app.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "movie-studio-app",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "movie-studio-app.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "112245194319",
  appId: process.env.FIREBASE_APP_ID || "1:112245194319:web:7b1a9a9c9a9a9c9c9a9a9c"
};

// TMDB API Configuration
export const TMDB_CONFIG = {
  apiKey: process.env.TMDB_API_KEY || "a8b8b003f5dc783925bf85925c2a1029",
  apiToken: process.env.TMDB_API_TOKEN || "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOGI4YjAwM2Y1ZGM3ODM5MjViZjg1OTI1YzJhMTAyOSIsIm5iZiI6MTc1MDgyNzQzOS4yNDk5OTk4LCJzdWIiOiI2ODViODFhZjMwNzM1MGExY2FjOWNmMTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.gLQidVf1KJSJD23B5BMEZOw06z10tuN0YYu7EGnv4vg",
  baseUrl: process.env.TMDB_API_BASE_URL || "https://api.themoviedb.org/3",
  imageBaseUrl: process.env.TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p/"
};

// Google OAuth Configuration
export const GOOGLE_CONFIG = {
  webClientId: process.env.GOOGLE_WEB_CLIENT_ID || "112245194319-7kjhq99hcfgpp2h9hucumpi9rqnk3sno.apps.googleusercontent.com",
  iosClientId: process.env.GOOGLE_IOS_CLIENT_ID || "112245194319-7kjhq99hcfgpp2h9hucumpi9rqnk3sno.apps.googleusercontent.com",
  androidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID || "112245194319-7kjhq99hcfgpp2h9hucumpi9rqnk3sno.apps.googleusercontent.com"
};

// App Configuration
export const APP_CONFIG = {
  name: "Movie Studio",
  scheme: "moviestudioapp",
  version: "1.0.0"
}; 