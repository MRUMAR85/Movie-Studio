// Configuration file for API keys and other settings

// App Configuration
export const APP_NAME = "Movie Studio";
export const APP_VERSION = "1.0.0";

// PayPal Configuration
export const PAYPAL_MODE = "SANDBOX"; 
export const PAYPAL_ID = "AS0glW8Jdc0S2BHQe88vmVjcuLCSQVgyPRKAJj9QQGiGeewk25PAzIDE5JGRiIkkamiVntsz4QsxAqQt";

// TMDB API Configuration
// The Movie Database (TMDB) provides a free API for movie data
export const TMDB_API_KEY = "a8b8b003f5dc783925bf85925c2a1029"; // User's API key
export const TMDB_API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOGI4YjAwM2Y1ZGM3ODM5MjViZjg1OTI1YzJhMTAyOSIsIm5iZiI6MTc1MDgyNzQzOS4yNDk5OTk4LCJzdWIiOiI2ODViODFhZjMwNzM1MGExY2FjOWNmMTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.gLQidVf1KJSJD23B5BMEZOw06z10tuN0YYu7EGnv4vg"; // User's API token
export const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
export const TMDB_IMAGE_SIZES = {
  poster: {
    small: "w185",
    medium: "w342",
    large: "w500",
    original: "original"
  },
  backdrop: {
    small: "w300",
    medium: "w780",
    large: "w1280",
    original: "original"
  },
  profile: {
    small: "w45",
    medium: "w185",
    large: "h632",
    original: "original"
  }
};

// Firebase configuration is loaded from the appropriate platform file
// For iOS: GoogleService-Info.plist
// For Android: google-services.json 

// App Theme
export const THEME = {
  colors: {
    primary: "#FF3B30",
    secondary: "#646cff",
    background: "#171720",
    card: "#282833",
    text: "#FFFFFF",
    border: "#3A3A3C",
    notification: "#FF9500",
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  }
}; 