// Firebase Service for authentication

// We need to install these packages:
// npm install @react-native-firebase/app @react-native-firebase/auth @react-native-google-signin/google-signin

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithCredential,
  UserCredential
} from 'firebase/auth';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { auth } from './firebase';
import { GOOGLE_CONFIG, APP_CONFIG } from './env';

console.log('Firebase Auth initialized in FirebaseService');

// Register the web browser redirect handler
WebBrowser.maybeCompleteAuthSession();

class FirebaseService {
  // Check if user is logged in
  getCurrentUser = () => {
    return auth.currentUser;
  };

  // Sign up with email and password
  signUp = async (email: string, password: string): Promise<UserCredential> => {
    try {
      console.log(`Attempting to sign up with email: ${email}`);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Sign up successful');
      return result;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  // Sign in with email and password
  signIn = async (email: string, password: string): Promise<UserCredential> => {
    try {
      console.log(`Attempting to sign in with email: ${email}`);
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign in successful');
      return result;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  // Sign in with Google using Expo Auth Session
  signInWithGoogle = async (): Promise<UserCredential> => {
    try {
      // Configure the auth session
      const redirectUrl = AuthSession.makeRedirectUri({
        scheme: APP_CONFIG.scheme
      });
      
      console.log('Redirect URL:', redirectUrl);
      
      const discovery = {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
        revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
      };
      
      // Start the auth flow
      const request = new AuthSession.AuthRequest({
        clientId: GOOGLE_CONFIG.webClientId,
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
        const credential = GoogleAuthProvider.credential(id_token);
        
        // Sign in with the credential
        return await signInWithCredential(auth, credential);
      } else {
        throw new Error('Google sign in was cancelled or failed');
      }
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  // Sign out
  signOut = async (): Promise<void> => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      throw error;
    }
  };

  // Reset password
  resetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  };
}

export default new FirebaseService(); 