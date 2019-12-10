import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

var firebaseConfig = {
  apiKey: "AIzaSyA4Vys1jo8XdpDYnnPBhfnNTn8dgHTk99g",
  authDomain: "car-rent-store.firebaseapp.com",
  databaseURL: "https://car-rent-store.firebaseio.com",
  projectId: "car-rent-store",
  storageBucket: "car-rent-store.appspot.com",
  messagingSenderId: "273341965801",
  appId: "1:273341965801:web:39342d81a1281b58"
};

firebase.initializeApp(firebaseConfig);

if (process.env.NODE_ENV === "development") {
  firebase.functions().useFunctionsEmulator("http://localhost:5000");
}

export default firebase;
