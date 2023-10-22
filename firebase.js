import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

//ideally values should come from env
const firebaseConfig = {
    apiKey: "AIzaSyDYZAPA0cnclbITDYfFvTjqmxIc6TuDEzA",
    authDomain: "todo-app-ed484.firebaseapp.com",
    projectId: "todo-app-ed484",
    storageBucket: "todo-app-ed484.appspot.com",
    messagingSenderId: "506239050190",
    appId: "1:506239050190:web:f412a01aa57b4160568b9f",
    measurementId: "G-RQGK6NR8B1"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
