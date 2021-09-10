import firebase from 'firebase/app';
require('firebase/auth');
require('firebase/firestore');

const config = {
  apiKey: 'Your API Key',
  authDomain: 'Your AuthDomain',
  projectId: 'Your Project Id',
  storageBucket: 'Your Storage Bucket',
  messagingSenderId: 'Your Message Sender Id',
  appId: 'Your App id',
  measurementId: 'Your Measurement Id',
  databaseURL: 'Your Database URL',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;
