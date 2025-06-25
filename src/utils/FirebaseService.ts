// Firebase Service for authentication

// We need to install these packages:
// npm install @react-native-firebase/app @react-native-firebase/auth @react-native-google-signin/google-signin

// This is a placeholder for the actual Firebase service implementation
// The commented code below shows what the final implementation would look like
// after installing the required dependencies

/*
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
*/

// Mock implementation for development
class MockFirebaseService {
  // Keep track of users for mock authentication
  private mockUsers = [
    { email: 'test@example.com', password: 'password123' }
  ];
  
  // Keep track of current user
  private currentUserData: { email: string } | null = null;

  getCurrentUser = () => {
    return this.currentUserData;
  };

  signUp = async (email: string, password: string) => {
    console.log('Mock sign up with:', email);
    
    // Check if user already exists
    const existingUser = this.mockUsers.find(user => user.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Add new user
    this.mockUsers.push({ email, password });
    this.currentUserData = { email };
    
    return { user: { email } };
  };

  signIn = async (email: string, password: string) => {
    console.log('Mock sign in with:', email);
    
    // Check credentials
    const user = this.mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      // For development, auto-create user if not exists
      this.mockUsers.push({ email, password });
      this.currentUserData = { email };
      return { user: { email } };
    }
    
    this.currentUserData = { email };
    return { user: { email } };
  };

  signInWithGoogle = async () => {
    console.log('Mock sign in with Google');
    const email = 'google@example.com';
    this.currentUserData = { email };
    return { user: { email } };
  };

  signOut = async () => {
    console.log('Mock sign out');
    this.currentUserData = null;
    return true;
  };

  resetPassword = async (email: string) => {
    console.log('Mock reset password for:', email);
    return true;
  };
}

export default new MockFirebaseService(); 