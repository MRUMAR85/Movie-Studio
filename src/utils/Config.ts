// Configuration file for API keys and other settings
import { APP_CONFIG, TMDB_CONFIG } from './env';

// App Configuration
export const APP_NAME = APP_CONFIG.name;
export const APP_VERSION = APP_CONFIG.version;

// PayPal Configuration
export const PAYPAL_MODE = "SANDBOX"; 
export const PAYPAL_ID = "AS0glW8Jdc0S2BHQe88vmVjcuLCSQVgyPRKAJj9QQGiGeewk25PAzIDE5JGRiIkkamiVntsz4QsxAqQt";

// TMDB API Configuration
// The Movie Database (TMDB) provides a free API for movie data
export const TMDB_API_KEY = TMDB_CONFIG.apiKey;
export const TMDB_API_TOKEN = TMDB_CONFIG.apiToken;
export const TMDB_API_BASE_URL = TMDB_CONFIG.baseUrl;
export const TMDB_IMAGE_BASE_URL = TMDB_CONFIG.imageBaseUrl;
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