import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAIg16sgh-e89FJ3e6ulSw04dOF6hPWm9Q",
  authDomain: "musicparty-bdc7a.firebaseapp.com",
  projectId: "musicparty-bdc7a",
  storageBucket: "musicparty-bdc7a.appspot.com",
  messagingSenderId: "1080332524762",
  appId: "1:1080332524762:web:54518522ff7dcefae299e3",
  measurementId: "G-NMVXDRGRX7"
});

const AuthContext = createContext();

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider hook that creates auth object and handles state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const sendSignInLinkToEmail = email => {
    return firebase
      .auth()
      .sendSignInLinkToEmail(email, {
        url: 'http://localhost:3000/confirm',
        handleCodeInApp: true,
      })
      .then(() => {
        return true;
      });
  };

  const signInWithEmailLink = (email, code) => {
    return firebase
      .auth()
      .signInWithEmailLink(email, code)
      .then(result => {
        setUser(result.user);
        return true;
      });
  };

  const logout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      setIsAuthenticating(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const values = {
    user,
    isAuthenticating,
    sendSignInLinkToEmail,
    signInWithEmailLink,
    logout,
  };

  return (
    <AuthContext.Provider value={values}>
      {!isAuthenticating && children}
    </AuthContext.Provider>
  );
};
