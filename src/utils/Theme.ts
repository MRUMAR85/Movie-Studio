/**
 * Theme configuration for the MovieStudioApp
 * Contains colors, typography, spacing, and other design constants
 */

// Colors
export const colors = {
  // Primary colors
  primary: '#ff3b30',
  secondary: '#646cff',
  
  // Background colors
  background: {
    primary: '#0F0F1A',
    secondary: '#171720',
    tertiary: '#282833',
  },
  
  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#CCCCCC',
    tertiary: '#8E8E93',
    accent: '#ff3b30',
  },
  
  // UI colors
  ui: {
    success: '#34C759',
    warning: '#FFCC00',
    error: '#FF3B30',
    info: '#007AFF',
    divider: '#3A3A3C',
  },
  
  // Overlay colors
  overlay: {
    dark: 'rgba(0, 0, 0, 0.7)',
    medium: 'rgba(0, 0, 0, 0.5)',
    light: 'rgba(0, 0, 0, 0.3)',
  },
};

// Typography
export const typography = {
  // Font sizes
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
  },
  
  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  // Line heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    normal: 1.5,
    loose: 1.75,
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
};

// Border radius
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  base: 12,
  lg: 16,
  xl: 20,
  circle: 999,
};

// Shadows
export const shadows = {
  light: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  strong: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 5,
  },
};

// Animation durations
export const animationDuration = {
  fast: 200,
  normal: 300,
  slow: 500,
};

// Default theme
const Theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animationDuration,
};

export default Theme; 