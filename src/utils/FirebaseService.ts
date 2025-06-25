// Firebase Service for authentication

// We need to install these packages:
// npm install @react-native-firebase/app @react-native-firebase/auth @react-native-google-signin/google-signin

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Initialize Google Sign-In
GoogleSignin.configure({
  webClientId: '112245194319-7kjhq99hcfgpp2h9hucumpi9rqnk3sno.apps.googleusercontent.com',
});

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

  // Sign in with Google
  signInWithGoogle = async () => {
    try {
      // Get the user ID token
      const { idToken } = await GoogleSignin.signIn();
      // Create a Google credential
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign in with credential
      return await auth().signInWithCredential(googleCredential);
    } catch (error) {
      throw error;
    }
  };

  // Sign out
  signOut = async () => {
    try {
      await auth().signOut();
      if (await GoogleSignin.isSignedIn()) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
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