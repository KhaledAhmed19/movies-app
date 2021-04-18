import firebase from 'firebase/app'
import "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAh8_1Rd8l4yXZyUol_Xr8p1dQo52S5P5I",
  authDomain: "movies-app-9c8d6.firebaseapp.com",
  databaseURL: "https://movies-app-9c8d6-default-rtdb.firebaseio.com",
  projectId: "movies-app-9c8d6",
  storageBucket: "movies-app-9c8d6.appspot.com",
  messagingSenderId: "1053934850351",
  appId: "1:1053934850351:web:d0e9994fc7c07cdf5f51da"
};
  // Initialize Firebase
 const firebaseApp =  firebase.initializeApp(firebaseConfig);
 export default firebaseApp;