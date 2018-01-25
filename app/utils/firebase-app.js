import * as firebase from 'firebase';

export default firebase.initializeApp({
  apiKey: "AIzaSyDp1p3KRxC_B6SBo6u4K-JLoWYuExn8fE8",
  authDomain: "advogaapp.firebaseapp.com",
  databaseURL: "https://advogaapp.firebaseio.com",
  projectId: "advogaapp",
  storageBucket: "advogaapp.appspot.com",
  messagingSenderId: "373074552675"
});

firebase.auth()
  .setPersistence('local')
  .then(() => {
    // console.log('firebase.auth().setPersistence');
  });

firebase.auth().onAuthStateChanged(user => {
  // console.log('firebaseUser', user);
});

export const FirebaseApp = firebase;

