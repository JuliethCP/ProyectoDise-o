import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDOBg5mpyT3ojDUL0GTs-DyQkA7IwCpwhc",
  authDomain: "proyectodisenno.firebaseapp.com",
  projectId: "proyectodisenno",
  storageBucket: "proyectodisenno.appspot.com",
  messagingSenderId: "497492911504",
  appId: "1:497492911504:web:fcebab26fdb4aa751fff15"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
