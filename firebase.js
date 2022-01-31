import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCVu81r4-Wz1Jrr4hLUgfLV7QnckdBXjJQ',
  authDomain: 'my-c2b01.firebaseapp.com',
  projectId: 'my-c2b01',
  storageBucket: 'my-c2b01.appspot.com',
  messagingSenderId: '836827447283',
  appId: '1:836827447283:web:ec959cdf98bc758c9b5c86',
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
