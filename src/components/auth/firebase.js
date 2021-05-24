import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAIg16sgh-e89FJ3e6ulSw04dOF6hPWm9Q",
    authDomain: "musicparty-bdc7a.firebaseapp.com",
    projectId: "musicparty-bdc7a",
    storageBucket: "musicparty-bdc7a.appspot.com",
    messagingSenderId: "1080332524762",
    appId: "1:1080332524762:web:54518522ff7dcefae299e3",
    measurementId: "G-NMVXDRGRX7"
  };
  const firebase = firebase.initializeApp(firebaseConfig);


  export default firebase;
