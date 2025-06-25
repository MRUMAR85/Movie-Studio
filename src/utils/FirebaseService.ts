// Firebase Service for authentication

// We need to install these packages:
// npm install @react-native-firebase/app @react-native-firebase/auth @react-native-google-signin/google-signin

import { 
  getAuth, 
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
import { firebaseApp } from '../../App';

// Initialize Firebase Auth with our app instance
const auth = getAuth(firebaseApp);

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
    return auth.currentUser;
  };

  // Sign up with email and password
  signUp = async (email: string, password: string): Promise<UserCredential> => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  // Sign in with email and password
  signIn = async (email: string, password: string): Promise<UserCredential> => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  // Sign in with Google using Expo Auth Session
  signInWithGoogle = async (): Promise<UserCredential> => {
    try {
      // Configure the auth session
      const redirectUrl = AuthSession.makeRedirectUri({
        scheme: 'moviestudioapp'
      });
      
      console.log('Redirect URL:', redirectUrl);
      
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