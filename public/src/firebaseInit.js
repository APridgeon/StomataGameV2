import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, child, get, push } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
import {getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';



const firebaseConfig = {
    apiKey: "AIzaSyAojsdPJiHhyYDpO7ikD0zdPxpGmq99qAY",
    authDomain: "youarealeaf-56830.firebaseapp.com",
    databaseURL: "https://youarealeaf-56830-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "youarealeaf-56830",
    storageBucket: "youarealeaf-56830.appspot.com",
    messagingSenderId: "279688498101",
    appId: "1:279688498101:web:e2ea4c02d0f5c133e0e7fc",
    measurementId: "G-SEBT3591D8"
  };
  


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const dbRef = ref(getDatabase());
let uid;



onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user;
  } else {
    uid = null;
  }
});



export {app, auth, provider, signInWithPopup, get, dbRef, child, uid, onAuthStateChanged};

export function writeUserData(waterLost, carbonGain, name) {
    const db = getDatabase();
    push(ref(db, 'Leaderboard/'), {
      waterloss: waterLost,
      carbonGain: carbonGain,
      WUE: (carbonGain/waterLost).toFixed(3),
      userName: name
    });
  }