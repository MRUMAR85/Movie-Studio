#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to execute shell commands
function runCommand(command) {
  try {
    console.log(`Executing: ${command}`);
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute ${command}`, error);
    return false;
  }
  return true;
}

// Check if config file exists, if not create it with our values
function setupConfig() {
  const configPath = path.join(__dirname, 'src', 'utils', 'Config.ts');
  
  if (!fs.existsSync(configPath)) {
    console.log('Creating config file...');
    
    const configContent = `// Configuration file for API keys and other settings

// PayPal Configuration
export const PAYPAL_MODE = "SANDBOX"; 
export const PAYPAL_ID = "AS0glW8Jdc0S2BHQe88vmVjcuLCSQVgyPRKAJj9QQGiGeewk25PAzIDE5JGRiIkkamiVntsz4QsxAqQt";

// TMDB API Configuration
// The Movie Database (TMDB) provides a free API for movie data
export const TMDB_API_KEY = "d4f7b87d7ce86f7fdfb5f3b049a597cb"; // Replace with your actual API key
export const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

// Firebase configuration is loaded from the appropriate platform file
// For iOS: GoogleService-Info.plist
// For Android: google-services.json`;
    
    // Ensure the directory exists
    if (!fs.existsSync(path.dirname(configPath))) {
      fs.mkdirSync(path.dirname(configPath), { recursive: true });
    }
    
    fs.writeFileSync(configPath, configContent);
    console.log('Config file created successfully!');
  }
}

// Main function to set up and run the project
async function setupAndRun() {
  console.log('Setting up Movie Studio App project...');
  
  // Install dependencies
  const installDepsResult = runCommand('npm install');
  if (!installDepsResult) process.exit(1);
  
  // Setup config file
  setupConfig();
  
  console.log('\nSetup completed successfully!');
  console.log('\nStarting Expo development server...');
  
  // Start the Expo development server
  runCommand('npm start');
}

// Run the main function
setupAndRun().catch(error => {
  console.error('Error during setup:', error);
  process.exit(1);
}); 