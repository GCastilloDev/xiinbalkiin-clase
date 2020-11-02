import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

// Credenciales
const firebaseConfig = {
  apiKey: 'AIzaSyBOrXlivPALqIZqybw8QvdaV0V0XLgfNQw',
  authDomain: 'xiinbalkiin-4b927.firebaseapp.com',
  databaseURL: 'https://xiinbalkiin-4b927.firebaseio.com',
  projectId: 'xiinbalkiin-4b927',
  storageBucket: 'xiinbalkiin-4b927.appspot.com',
  messagingSenderId: '1036598837550',
  appId: '1:1036598837550:web:8c2541f91a04aad4c97abf',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Instancia que nos permite manejar la base de datos
// de firestore
const db = firebase.firestore();
const storage = firebase.storage().ref();

export { db, storage };
