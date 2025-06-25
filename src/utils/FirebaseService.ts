// Firebase Service for authentication

// We need to install these packages:
// npm install @react-native-firebase/app @react-native-firebase/auth @react-native-google-signin/google-signin

import auth from '@react-native-firebase/auth';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

// Register the web browser redirect handler
WebBrowser.maybeCompleteAuthSession();

// Google OAuth configuration
const googleConfig = {
  expoClientId: '112245194319-7kjhq99hcfgpp2h9hucumpi9rqnk3sno.apps.googleusercontent.com',
  webClientId: '112245194319-7kjhq99hcfgpp2h9hucumpi9rqnk3sno.apps.googleusercontent.com',
  androidClientId: '112245194319-7kjhq99hcfgpp2h9hucumpi9rqnk3sno.apps.googleusercontent.com',
  iosClientId: '112245194319-7kjhq99hcfgpp2h9hucumpi9rqnk3sno.apps.googleusercontent.com',
};

class FirebaseService {
  // Check if user is logged in
  getCurrentUser = () => {
    return auth().currentUser;
  };

  // Sign up with email and password
  signUp = async (email: string, password: string) => {
    try {
      return await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  };

  // Sign in with email and password
  signIn = async (email: string, password: string) => {
    try {
      return await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  };

  // Sign in with Google using Expo Auth Session
  signInWithGoogle = async () => {
    try {
      // Configure the auth session
      const redirectUrl = AuthSession.makeRedirectUri();
      const discovery = {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
        revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
      };
      
      // Start the auth flow
      const request = new AuthSession.AuthRequest({
        clientId: googleConfig.webClientId,
        redirectUri: redirectUrl,
        responseType: AuthSession.ResponseType.IdToken,
        scopes: ['openid', 'profile', 'email'],
      });
      
      // Prompt the user to authenticate
      const result = await request.promptAsync(discovery);
      
      if (result.type === 'success') {
        // Get the ID token from the response
        const { id_token } = result.params;
        
        // Create a credential with the token
        const credential = auth.GoogleAuthProvider.credential(id_token);
        
        // Sign in with the credential
        return await auth().signInWithCredential(credential);
      } else {
        throw new Error('Google sign in was cancelled or failed');
      }
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  // Sign out
  signOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      throw error;
    }
  };

  // Reset password
  resetPassword = async (email: string) => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (error) {
      throw error;
    }
  };
}

export default new FirebaseService(); 